import { Button } from '@/shared/Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/Components/ui/dropdown-menu';
import { IRootuser } from '@/shared/models/userinterfaces';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

interface UseGenerateColumnsProps {
  editPermissions: boolean;
  handleEdit?: (user: IRootuser) => void;
}

export const useGenerateColumns = ({
  editPermissions,
  handleEdit,
}: UseGenerateColumnsProps) => {
  const columns: ColumnDef<IRootuser>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8">
                Actions
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {handleEdit && (
                <DropdownMenuItem
                  onClick={() => handleEdit(user)}
                  disabled={!editPermissions}
                >
                  Edit
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
