import { cn, formatToIDR } from '@/lib/utils';
import { fuelHistoryCreateFormSchema } from '@/Pages/Vehicle/models/schema';
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
import { ICreateVehicleFuelHistoryPayloadRoot } from '@/shared/models/vehicleInterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IFuelHistoryCreateForm {
  vehicleId: string;
  onSubmit: (payload: ICreateVehicleFuelHistoryPayloadRoot) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type FormSchema = z.infer<typeof fuelHistoryCreateFormSchema>;

export function FuelHistoryCreateForm({
  vehicleId,
  onSubmit,
  onCancel,
  isLoading = false,
}: IFuelHistoryCreateForm) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(fuelHistoryCreateFormSchema),
    defaultValues: {
      vehicle_id: vehicleId,
      amount_liters: undefined,
      cost: undefined,
      refuel_date: new Date(),
      notes: '',
    },
  });

  const handleSubmit = (values: FormSchema) => {
    const payload: any = {
      ...values,
      vehicle_id: values.vehicle_id,
      amount_liters: Number(values.amount_liters),
      cost: Number(values.cost),
      refuel_date: format(values.refuel_date, 'yyyy-MM-dd'),
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
            name="amount_liters"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Amount(Liters)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount of fuel"
                    {...field}
                    value={field.value ?? ''}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter cost"
                    value={
                      field.value ? formatToIDR(field.value.toString()) : ''
                    }
                    onChange={e => {
                      const value = e.target.value;
                      const digits = value.replace(/[^\d]/g, '');
                      if (digits === '') {
                        field.onChange(undefined);
                      } else {
                        field.onChange(Number(digits));
                      }
                    }}
                    onBlur={e => {
                      if (field.value) {
                        const formatted = formatToIDR(field.value.toString());
                        e.target.value = formatted;
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="refuel_date"
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
            name="notes"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Enter notes" {...field} />
                </FormControl>
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
