import ManagementHeader from '@/shared/Components/ManagementHeader';
import AuthenticatedLayout from '@/shared/Layouts/AuthenticatedLayout';
import {
  IDashboardChartData,
  IDashboardStatistics,
} from '@/shared/models/dashboardinterfaces';
import { Head } from '@inertiajs/react';
import { Car, Package, Shield, User } from 'lucide-react';
import DashboardCard from './components/DashboardCard';
import DashboardChart from './components/DashboardChart';

interface IDahsboard {
  chartData: IDashboardChartData[];
  statistics: IDashboardStatistics;
}
export default function Dashboard({ chartData, statistics }: IDahsboard) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="mb-10">
        <ManagementHeader
          title="Dashboard"
          desc="Welcome to vehicle's admin dashboard."
        />

        <div className="mt-10 grid h-full w-full grid-cols-4 grid-rows-4 gap-4">
          <DashboardCard title="Admins">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <Shield />
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2 className="text-xs">Total</h2>
                <p className="text-3xl font-semibold">
                  {statistics.total_admins}
                </p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard title="Users">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <User />
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2 className="text-xs">Total</h2>
                <p className="text-3xl font-semibold">
                  {statistics.total_users}
                </p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard title="Vehicles">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <Car />
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2 className="text-xs">Total</h2>
                <p className="text-3xl font-semibold">
                  {statistics.total_vehicles}
                </p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard title="Bookings">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <Package />
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2 className="text-xs">Total</h2>
                <p className="text-3xl font-semibold">
                  {statistics.total_bookings}
                </p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard
            title="Vehicle Bookings Overview"
            className="col-span-4 row-span-3"
          >
            <DashboardChart chartData={chartData} statistics={statistics} />
          </DashboardCard>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
