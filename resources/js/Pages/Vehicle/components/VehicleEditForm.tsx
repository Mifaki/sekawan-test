import { cn } from '@/lib/utils';
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
import { IRootVehicle } from '@/shared/models/vehicleInterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { vehicleEditFormSchema } from '../models/schema';

interface IVehicleEditForm {
  data: IRootVehicle | null;
  onSubmit: (data: IRootVehicle) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type FormSchema = z.infer<typeof vehicleEditFormSchema>;

export function VehicleEditForm({
  data,
  onSubmit,
  onCancel,
  isLoading = false,
}: IVehicleEditForm) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(vehicleEditFormSchema),
    defaultValues: {
      ...data,
      id: data?.id?.toString() || '',
      manufacturing_year: data?.manufacturing_year?.toString() || '',
      registration_expiry: data?.registration_expiry
        ? new Date(data.registration_expiry)
        : undefined,
    },
  });

  const handleSubmit = (values: FormSchema) => {
    const submittedValues = {
      ...values,
      registration_expiry: format(values.registration_expiry, 'yyyy-MM-dd'),
    };
    onSubmit(submittedValues as unknown as IRootVehicle);
  };

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          id="edit-vehicle-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="registration_number"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter registration number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cargo">Cargo</SelectItem>
                    <SelectItem value="passenger">Passenger</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownership_type"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Ownership Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="rental">Rental</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturing_year"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Manufacturing Year</FormLabel>
                <FormControl>
                  <Input placeholder="Enter manufacturing year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chassis_number"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Chassis Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chassis number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engine_number"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Engine Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter engine number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registration_expiry"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Date of birth</FormLabel>
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
                      disabled={(date: any) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
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
            name="is_active"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={value => field.onChange(value === 'true')}
                  defaultValue={field.value ? 'true' : 'false'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
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
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
