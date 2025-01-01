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
import {
  ICreateBookingPayloadRoot,
  IRootUserBooking,
  IRootVehicleBooking,
} from '@/shared/models/bookinginterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IBookingCreateForm {
  onSubmit: (payload: ICreateBookingPayloadRoot) => void;
  onCancel: () => void;
  isLoading?: boolean;
  vehicles: IRootVehicleBooking[];
  users: IRootUserBooking[];
}

const bookingCreateFormSchema = z
  .object({
    vehicle_id: z.string().min(1, 'Vehicle is required'),
    driver_id: z.string().min(1, 'Driver is required'),
    start_datetime: z.date(),
    end_datetime: z.date(),
    purpose: z.string().min(1, 'Purpose is required'),
    destination: z.string().min(1, 'Destination is required'),
    passenger_count: z.number().min(1, 'Passenger count must be at least 1'),
    first_reviewer: z.string().min(1, 'First reviewer is required'),
    second_reviewer: z.string().min(1, 'Second reviewer is required'),
  })
  .refine(data => data.end_datetime > data.start_datetime, {
    message: 'End time must be after start time',
    path: ['end_datetime'],
  })
  .refine(data => data.first_reviewer !== data.second_reviewer, {
    message: 'First and second reviewer must be different',
    path: ['second_reviewer'],
  });

type FormSchema = z.infer<typeof bookingCreateFormSchema>;

export function BookingCreateForm({
  onSubmit,
  onCancel,
  isLoading = false,
  vehicles,
  users,
}: IBookingCreateForm) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(bookingCreateFormSchema),
    defaultValues: {
      vehicle_id: '',
      driver_id: '',
      start_datetime: new Date(),
      end_datetime: new Date(),
      purpose: '',
      destination: '',
      passenger_count: 1,
      first_reviewer: '',
      second_reviewer: '',
    },
  });

  const handleSubmit = (values: FormSchema) => {
    const payload: ICreateBookingPayloadRoot = {
      ...values,
      start_datetime: format(values.start_datetime, "yyyy-MM-dd'T'HH:mm:ss"),
      end_datetime: format(values.end_datetime, "yyyy-MM-dd'T'HH:mm:ss"),
      passenger_count: Number(values.passenger_count),
    };
    onSubmit(payload);
  };

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="vehicle_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map(vehicle => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.registration_number} - {vehicle.vehicle_type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="driver_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP HH:mm')
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
            name="end_datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP HH:mm')
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
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input placeholder="Enter booking purpose" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passenger_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passenger Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of passengers"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="first_reviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Reviewer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select first reviewer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="second_reviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second Reviewer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select second reviewer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 flex justify-end">
            <FormFooter
              primaryText="Create Booking"
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
