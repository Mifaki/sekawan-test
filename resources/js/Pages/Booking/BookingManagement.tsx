import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/usePermission';
import { useSheetReducer } from '@/hooks/useSheetReducer';
import { DataTable } from '@/shared/Components/DataTable';
import { GenericSheet } from '@/shared/Components/GenericSheet';
import ManagementHeader from '@/shared/Components/ManagementHeader';
import { Button } from '@/shared/Components/ui/button';
import AuthenticatedLayout from '@/shared/Layouts/AuthenticatedLayout';
import {
  ICreateBookingPayloadRoot,
  IRootBooking,
  IRootUserBooking,
  IRootVehicleBooking,
  IUpdateBookingPayloadRoot,
} from '@/shared/models/bookinginterfaces';
import { SheetType } from '@/shared/models/generalinterfaces';
import { VehicleBookingAPI } from '@/shared/repositories/bookingService';
import { Head, router, usePage } from '@inertiajs/react';
import { Download, PlusCircleIcon } from 'lucide-react';
import BookingApprovalForm from './components/ApprovalForm';
import { useGenerateColumns } from './components/column';
import { BookingCreateForm } from './components/CreateForm';
import { bookingSheetConfig } from './models/sheetConfig';

interface IBookingManagement {
  bookings: IRootBooking[];
  vehicles: IRootVehicleBooking[];
  users: IRootUserBooking[];
}

const BookingManagement = ({
  bookings,
  vehicles,
  users,
}: IBookingManagement) => {
  const { auth } = usePage().props;
  const { canDownloadBookings, canCreateBookings } = usePermissions(
    auth.user?.permissions
  );

  const userId = String(auth.user.id);

  const { toast } = useToast();

  const { getSheetState, openSheet, closeSheet } =
    useSheetReducer<IRootBooking>();

  const sheetState = getSheetState('booking-sheet');

  const handleAuthorize = (booking: IRootBooking) => {
    openSheet('booking-sheet', 'authorize', booking);
  };

  const handleCreateBooking = async (payload: ICreateBookingPayloadRoot) => {
    try {
      const res = await VehicleBookingAPI.createBooking(payload);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle booking created successfully!',
        });

        router.reload();
        closeSheet('booking-sheet');
      }
    } catch (error) {
      console.error('Error creating vehicle booking', error);

      toast({
        description: 'Failed to create vehicle booking. Please try again.',
      });
    }
  };

  const handleUpdateBooking = async (
    bookingId: string,
    payload: IUpdateBookingPayloadRoot
  ) => {
    try {
      const response = await VehicleBookingAPI.updateBooking(
        bookingId,
        payload
      );

      if (response.status === 200) {
        toast({
          description: `Booking ${payload.action.toLowerCase()} successfully!`,
        });
        router.reload();
        closeSheet('booking-sheet');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description:
          error.response?.data?.message ||
          'Failed to process booking. Please try again.',
      });
    }
  };

  const sheetContent: Partial<Record<SheetType, JSX.Element>> = {
    create: (
      <BookingCreateForm
        vehicles={vehicles}
        users={users}
        onSubmit={handleCreateBooking}
        onCancel={() => closeSheet('booking-sheet')}
        isLoading={false}
      />
    ),
    authorize: (
      <BookingApprovalForm
        onSubmit={values =>
          handleUpdateBooking(sheetState.data?.id ?? '', values)
        }
        onClose={() => closeSheet('booking-sheet')}
      />
    ),
  };

  const columns = useGenerateColumns({
    userId,
    handleAuthorize,
  });

  const handleExport = () => {
    if (!canDownloadBookings) return;

    window.location.href = route('bookings.export');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Booking Management" />
      <div className="mb-10">
        <ManagementHeader
          title="Booking Management"
          desc="Manage vehicle's bookings approval and assignment"
          actionComponent={
            <div className="flex items-center gap-3">
              {canCreateBookings && (
                <Button onClick={() => openSheet('booking-sheet', 'create')}>
                  Add Booking <PlusCircleIcon />{' '}
                </Button>
              )}
              {canDownloadBookings && (
                <Button variant="outline" onClick={handleExport}>
                  Export
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          }
        />
        <DataTable
          columns={columns}
          data={bookings}
          searchPlaceholder="Search user"
          searchableColumns={[
            'vehicle_registration_number',
            'driver_name',
            'requester_name',
            'start_datetime',
            'end_datetime',
            'destination',
            'purpose',
          ]}
        />
      </div>

      <GenericSheet
        sheetId="booking-sheet"
        isOpen={sheetState.isOpen}
        onClose={() => closeSheet('booking-sheet')}
        type={sheetState.type}
        config={bookingSheetConfig}
        sheetContent={sheetContent}
      />
    </AuthenticatedLayout>
  );
};

export default BookingManagement;
