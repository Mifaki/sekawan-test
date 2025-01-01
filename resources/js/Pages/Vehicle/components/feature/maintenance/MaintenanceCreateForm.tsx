import { cn } from '@/lib/utils';
import { maintenanceCreateFormSchema } from '@/Pages/Vehicle/models/schema';
import { FormFooter } from '@/shared/Components/FormFooter';
import { Button } from '@/shared/Components/ui/button';
import { Calendar } from '@/shared/Components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/Components/ui/form';
import { Input } from '@/shared/Components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/Components/ui/popover';
import { ScrollArea } from '@/shared/Components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/Components/ui/select';
import {
  ICreateVehicleMaintenancePayloadRoot,
  MaintenanceStatusEnum,
} from '@/shared/models/vehicleInterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IMaintenanceCreateForm {
  vehicleId: string;
  onSubmit: (payload: ICreateVehicleMaintenancePayloadRoot) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type FormSchema = z.infer<typeof maintenanceCreateFormSchema>;

export function MaintenanceCreateForm({
  vehicleId,
  onSubmit,
  onCancel,
  isLoading = false,
}: IMaintenanceCreateForm) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(maintenanceCreateFormSchema),
    defaultValues: {
      vehicle_id: vehicleId,
      maintenance_type: '',
      description: '',
      status: 'scheduled',
      scheduled_date: new Date(),
    },
  });

  const handleSubmit = (values: FormSchema) => {
    const payload: ICreateVehicleMaintenancePayloadRoot = {
      vehicle_id: values.vehicle_id,
      scheduled_date: format(values.scheduled_date, 'yyyy-MM-dd'),
      maintenance_type: values.maintenance_type,
      description: values.description,
      status: values.status as MaintenanceStatusEnum,
    };
    onSubmit(payload);
  };

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          id="create-maintenance-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Scheduled Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenance_type"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Maintenance Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter maintenance type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFooter
            primaryText="Save changes"
            secondaryText="Cancel"
            isLoading={isLoading}
            primaryProps={{
              type: 'submit',
              disabled: isLoading,
            }}
            secondaryProps={{
              onClick: onCancel,
              type: 'button',
            }}
          />
        </form>
      </Form>
    </ScrollArea>
  );
}
