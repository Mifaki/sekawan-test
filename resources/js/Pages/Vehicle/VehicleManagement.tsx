import { useToast } from '@/hooks/use-toast';
import { useSheetReducer } from '@/hooks/useSheetReducer';
import { DataTable } from '@/shared/Components/DataTable';
import { GenericSheet } from '@/shared/Components/GenericSheet';
import ManagementHeader from '@/shared/Components/ManagementHeader';
import { Button } from '@/shared/Components/ui/button';
import AuthenticatedLayout from '@/shared/Layouts/AuthenticatedLayout';
import { SheetType } from '@/shared/models/generalinterfaces';
import {
  ICreateVehicleFuelHistoryPayloadRoot,
  ICreateVehicleMaintenancePayloadRoot,
  ICreateVehiclePayloadRoot,
  IRootVehicle,
  IRootVehicleFuel,
  IRootVehicleMaintenance,
} from '@/shared/models/vehicleInterfaces';
import { VehicleAPI } from '@/shared/repositories/vehicleService';
import { Head, router } from '@inertiajs/react';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useGenerateColumns } from './components/column';
import { useGenerateFuelHistoryColumns } from './components/feature/fuelHistories/fuelHistoriesColumn';
import { FuelHistoryCreateForm } from './components/feature/fuelHistories/FuelHistoryCreateForm';
import { useGenerateMaintenanceColumns } from './components/feature/maintenance/maintenanceColumn';
import { MaintenanceCreateForm } from './components/feature/maintenance/MaintenanceCreateForm';
import { VehicleCreateForm } from './components/VehicleCreateForm';
import { VehicleEditForm } from './components/VehicleEditForm';
import {
  fuelSheetConfig,
  maintenanceSheetConfig,
  vehicleSheetConfig,
} from './models/sheetConfig';

export interface IVehicleManagement {
  vehicles: IRootVehicle[];
}

export default function VehicleManagement({ vehicles }: IVehicleManagement) {
  const { toast } = useToast();

  const [maintenances, setMaintenances] = useState<IRootVehicleMaintenance[]>(
    []
  );
  const [isLoadingMaintenance, setIsLoadingMaintenance] = useState(false);

  const [fuelHistories, setFuelHistories] = useState<IRootVehicleFuel[]>([]);
  const [isLoadingFuelHistories, setIsLoadingFuelHistories] = useState(false);

  const { getSheetState, openSheet, closeSheet } =
    useSheetReducer<IRootVehicle>();

  const vehicleSheetState = getSheetState('vehicle-sheet');
  const maintenanceSheetState = getSheetState('maintenance-sheet');
  const fuelSheetState = getSheetState('fuel-sheet');

  const handleMaintenance = async (vehicle: IRootVehicle) => {
    try {
      setIsLoadingMaintenance(true);
      openSheet('maintenance-sheet', 'view', vehicle);
      const response = await VehicleAPI.getMaintenanceById(vehicle.id);
      setMaintenances(response.maintenance);
    } catch (error) {
      toast({
        description: 'Failed to load maintenance data. Please try again.',
      });
    } finally {
      setIsLoadingMaintenance(false);
    }
  };

  const handleFuel = async (vehicle: IRootVehicle) => {
    try {
      setIsLoadingFuelHistories(true);
      openSheet('fuel-sheet', 'view', vehicle);
      const response = await VehicleAPI.getFuelHistoryById(vehicle.id);
      setFuelHistories(response.fuel_histories);
    } catch (error) {
      toast({
        description: 'Failed to load fuel histories. Please try again.',
      });
    } finally {
      setIsLoadingFuelHistories(false);
    }
  };

  const handleCreateVehicle = async (payload: ICreateVehiclePayloadRoot) => {
    try {
      const res = await VehicleAPI.createVehicle(payload);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle created successfully!',
        });

        router.reload();
        closeSheet('vehicle-sheet');
      }
    } catch (error) {
      console.error('Error creating vehicle', error);

      toast({
        description: 'Failed to create vehicle. Please try again.',
      });
    }
  };

  const handleSubmit = async (updatedVehicle: IRootVehicle) => {
    try {
      const res = await VehicleAPI.updateVehicle(
        updatedVehicle.id,
        updatedVehicle
      );

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle updated successfully!',
        });

        router.reload();
        closeSheet('vehicle-sheet');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);

      toast({
        description: 'Failed to update vehicle. Please try again.',
      });
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      const res = await VehicleAPI.deleteVehicle(vehicleId);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle deleted successfully!',
        });

        router.reload();
      }
    } catch (error) {
      console.error('Error deleting vehicle', error);

      toast({
        description: 'Failed to delete vehicle. Please try again.',
      });
    }
  };

  const handleCreateMaintenance = async (
    vehicleMaintenance: ICreateVehicleMaintenancePayloadRoot
  ) => {
    try {
      const res = await VehicleAPI.createMaintenance(vehicleMaintenance);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle maintenance created successfully!',
        });

        router.reload();
        closeSheet('maintenance-sheet');
      }
    } catch (error) {
      console.error('Error creating vehicle maintenance', error);

      toast({
        description: 'Failed to create vehicle maintenance. Please try again.',
      });
    }
  };

  const handleDeleteMaintenance = async (maintenanceId: string) => {
    try {
      const res = await VehicleAPI.deleteMaintenance(maintenanceId);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle maintenance deleted successfully!',
        });

        router.reload();
        closeSheet('maintenance-sheet');
      }
    } catch (error) {
      console.error('Error deleting vehicle maintenance', error);

      toast({
        description: 'Failed to delete vehicle maintenance. Please try again.',
      });
    }
  };

  const handleCreateFuelHistory = async (
    payload: ICreateVehicleFuelHistoryPayloadRoot
  ) => {
    try {
      const res = await VehicleAPI.createFuelHistory(payload);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle fuel history created successfully!',
        });

        router.reload();
        closeSheet('fuel-sheet');
      }
    } catch (error) {
      console.error('Error creating vehicle fuel history', error);

      toast({
        description: 'Failed to create vehicle fuel history. Please try again.',
      });
    }
  };

  const handleDeleteFuelHistory = async (fuelHistoryId: string) => {
    try {
      const res = await VehicleAPI.deleteFuelHistory(fuelHistoryId);

      if (res.status === 200 || res.status === 201) {
        toast({
          description: 'Vehicle fuel history deleted successfully!',
        });

        router.reload();
        closeSheet('fuel-sheet');
      }
    } catch (error) {
      console.error('Error deleting vehicle fuel history', error);

      toast({
        description: 'Failed to delete vehicle fuel history. Please try again.',
      });
    }
  };

  const handleEdit = (vehicle: IRootVehicle) => {
    openSheet('vehicle-sheet', 'edit', vehicle);
  };

  const handleOpenMaintenance = (vehicle: IRootVehicle) => {
    closeSheet('maintenance-sheet');
    setTimeout(() => {
      openSheet('maintenance-sheet', 'create', vehicle);
    }, 500);
  };

  const handleOpenFuelHistories = (vehicle: IRootVehicle) => {
    closeSheet('fuel-sheet');
    setTimeout(() => {
      openSheet('fuel-sheet', 'create', vehicle);
    }, 500);
  };

  const columns = useGenerateColumns({
    handleEdit,
    handleMaintenance,
    handleFuel,
    handleDeleteVehicle,
  });

  const maintenanceColums = useGenerateMaintenanceColumns({
    handleDeleteMaintenance,
  });

  const fuelHistoryColumns = useGenerateFuelHistoryColumns({
    handleDeleteFuelHistory,
  });

  const vehicleSheetContent: Partial<Record<SheetType, JSX.Element>> = {
    create: (
      <VehicleCreateForm
        onSubmit={handleCreateVehicle}
        onCancel={() => closeSheet('vehicle-sheet')}
      />
    ),
    edit: (
      <VehicleEditForm
        data={vehicleSheetState.data as unknown as IRootVehicle}
        onSubmit={handleSubmit}
        onCancel={() => closeSheet('vehicle-sheet')}
        isLoading={false}
      />
    ),
  };

  const maintenanceSheetContent: Partial<Record<SheetType, JSX.Element>> = {
    create: (
      <MaintenanceCreateForm
        vehicleId={maintenanceSheetState.data?.id ?? ''}
        onSubmit={handleCreateMaintenance}
        onCancel={() => closeSheet('maintenance-sheet')}
      />
    ),
    view: (
      <>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">
            Vehicle's Maintenance (
            {maintenanceSheetState.data?.registration_number})
          </h2>
          <Button
            onClick={() => handleOpenMaintenance(maintenanceSheetState.data!)}
          >
            Add Maintenance
            <PlusCircleIcon />
          </Button>
        </div>
        <DataTable
          columns={maintenanceColums}
          data={maintenances}
          maxHeight="max-h-96"
          searchPlaceholder="Search Maintenance"
          searchableColumns={['maintenance_type', 'description', 'status']}
          isLoading={isLoadingMaintenance}
        />
      </>
    ),
  };

  const fuelSheetContent: Partial<Record<SheetType, JSX.Element>> = {
    create: (
      <FuelHistoryCreateForm
        vehicleId={fuelSheetState.data?.id ?? ''}
        onSubmit={handleCreateFuelHistory}
        onCancel={() => closeSheet('fuel-sheet')}
      />
    ),
    view: (
      <>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">
            Vehicle's Fuel History ({fuelSheetState.data?.registration_number})
          </h2>
          <Button onClick={() => handleOpenFuelHistories(fuelSheetState.data!)}>
            Add Fuel History
            <PlusCircleIcon />
          </Button>
        </div>
        <DataTable
          columns={fuelHistoryColumns}
          data={fuelHistories}
          maxHeight="max-h-96"
          searchPlaceholder="Search Fuel History"
          searchableColumns={[
            'driver_name',
            'amount_liters',
            'cost',
            'refuel_date',
          ]}
          isLoading={isLoadingFuelHistories}
        />
      </>
    ),
  };

  return (
    <AuthenticatedLayout>
      <Head title="Vehicle Management" />
      <div className="mb-10">
        <ManagementHeader
          title="Vehicle Management"
          desc="Manage your vehicles and other related component."
          actionComponent={
            <Button onClick={() => openSheet('vehicle-sheet', 'create')}>
              Add Vehicle <PlusCircleIcon />{' '}
            </Button>
          }
        />
        <DataTable
          columns={columns}
          data={vehicles}
          searchPlaceholder="Search user"
          searchableColumns={[
            'registration_number',
            'vehicle_type',
            'ownership_type',
          ]}
        />
      </div>

      <GenericSheet
        sheetId="vehicle-sheet"
        isOpen={vehicleSheetState.isOpen}
        onClose={() => closeSheet('vehicle-sheet')}
        type={vehicleSheetState.type}
        config={vehicleSheetConfig}
        sheetContent={vehicleSheetContent}
      />

      <GenericSheet
        sheetId="maintenance-sheet"
        isOpen={maintenanceSheetState.isOpen}
        onClose={() => closeSheet('maintenance-sheet')}
        type={maintenanceSheetState.type}
        config={maintenanceSheetConfig}
        sheetContent={maintenanceSheetContent}
      />

      <GenericSheet
        sheetId="fuel-sheet"
        isOpen={fuelSheetState.isOpen}
        onClose={() => closeSheet('fuel-sheet')}
        type={fuelSheetState.type}
        config={fuelSheetConfig}
        sheetContent={fuelSheetContent}
      />
    </AuthenticatedLayout>
  );
}
