import { z } from 'zod';

export const vehicleEditFormSchema = z.object({
  id: z.string(),
  registration_number: z.string().min(1, 'Registration number is required.'),
  vehicle_type: z.enum(['cargo', 'passenger']),
  ownership_type: z.enum(['company', 'rental']),
  brand: z.string().min(1, 'Brand is required.'),
  model: z.string().min(1, 'Model is required.'),
  manufacturing_year: z.string().min(4, 'Valid year required'),
  chassis_number: z.string().min(1, 'Chassis number is required.'),
  engine_number: z.string().min(1, 'Engine number is required.'),
  registration_expiry: z.date({
    required_error: 'Registration expiry is required.',
  }),
  is_active: z.boolean().default(true),
});

export const vehicleCreateFormSchema = z.object({
  registration_number: z.string().min(1, 'Registration number is required.'),
  vehicle_type: z.enum(['cargo', 'passenger']),
  ownership_type: z.enum(['company', 'rental']),
  brand: z.string().min(1, 'Brand is required.'),
  model: z.string().min(1, 'Model is required.'),
  manufacturing_year: z.string().min(4, 'Valid year required'),
  chassis_number: z.string().min(1, 'Chassis number is required.'),
  engine_number: z.string().min(1, 'Engine number is required.'),
  registration_expiry: z.date({
    required_error: 'Registration expiry is required.',
  }),
  is_active: z.boolean().default(true),
});

export const fuelHistoryCreateFormSchema = z.object({
  vehicle_id: z.string(),
  amount_liters: z.number().min(1, 'Amount Liters type is required.'),
  cost: z.number().min(1, 'Cost is required.'),
  refuel_date: z.date({ required_error: 'Refuel date is required.' }),
  notes: z.string(),
});

export const maintenanceCreateFormSchema = z.object({
  vehicle_id: z.string(),
  scheduled_date: z.date({ required_error: 'Scheduled date is required.' }),
  maintenance_type: z.string().min(1, 'Maintenance type is required.'),
  description: z.string().min(1, 'Description is required.'),
  status: z.enum([
    'scheduled',
    'in_progress',
    'completed',
    'cancelled',
  ] as const),
});
