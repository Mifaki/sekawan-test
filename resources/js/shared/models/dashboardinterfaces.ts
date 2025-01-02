export interface IDashboardChartData {
  month: string;
  approved_l1: number;
  pending: number;
  rejected: number;
  completed: number;
}

export interface IDashboardStatistics {
  total_users: number;
  total_admins: number;
  total_vehicles: number;
  total_bookings: number;
}
