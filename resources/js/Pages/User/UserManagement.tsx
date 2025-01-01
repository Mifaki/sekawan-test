import { useToast } from '@/hooks/use-toast';
import { useSheetReducer } from '@/hooks/useSheetReducer';
import { DataTable } from '@/shared/Components/DataTable';
import { GenericSheet } from '@/shared/Components/GenericSheet';
import ManagementHeader from '@/shared/Components/ManagementHeader';
import AuthenticatedLayout from '@/shared/Layouts/AuthenticatedLayout';
import { SheetType } from '@/shared/models/generalinterfaces';
import { IRootuser } from '@/shared/models/userinterfaces';
import { UserAPI } from '@/shared/repositories/userService';
import { Head, router, usePage } from '@inertiajs/react';
import { useGenerateColumns } from './components/column';
import { EditForm } from './components/EditForm';

export interface IUserManagement {
  users: IRootuser[];
}

const userSheetConfig = {
  title: {
    edit: 'Edit User',
    view: 'View User',
  },
  description: {
    edit: 'Make changes to the user profile here.',
    view: 'View user details.',
  },
};

export default function UseraManagement({ users }: IUserManagement) {
  const { auth } = usePage().props;
  const editPermissions = auth.user.role === 'admin';

  const { toast } = useToast();

  const { getSheetState, openSheet, closeSheet } = useSheetReducer<IRootuser>();

  const userSheetState = getSheetState('user-sheet');

  const handleEdit = (user: IRootuser) => {
    openSheet('user-sheet', 'edit', user);
  };

  const handleSubmit = async (updatedUser: IRootuser) => {
    try {
      const res = await UserAPI.updateUser(updatedUser.id, updatedUser);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'User updated successfully!',
        });

        router.reload();
        closeSheet('user-sheet');
      }
    } catch (error) {
      console.error('Error updating user:', error);

      toast({
        description: 'Failed to update user. Please try again.',
      });
    }
  };

  const columns = useGenerateColumns({
    editPermissions,
    handleEdit,
  });

  const sheetContent: Partial<Record<SheetType, JSX.Element>> = {
    edit: (
      <EditForm
        data={userSheetState.data}
        onSubmit={handleSubmit}
        onCancel={() => closeSheet('user-sheet')}
        isLoading={false}
      />
    ),
  };

  return (
    <AuthenticatedLayout>
      <Head title="User Management" />
      <div className="mb-10">
        <ManagementHeader
          title="User Management"
          desc="Manage your users and their roles here."
        />
        <DataTable
          columns={columns}
          data={users}
          searchPlaceholder="Search user"
          searchableColumns={['email', 'name']}
        />
      </div>

      <GenericSheet
        sheetId="user-sheet"
        isOpen={userSheetState.isOpen}
        onClose={() => closeSheet('user-sheet')}
        type={userSheetState.type}
        config={userSheetConfig}
        sheetContent={sheetContent}
      />
    </AuthenticatedLayout>
  );
}