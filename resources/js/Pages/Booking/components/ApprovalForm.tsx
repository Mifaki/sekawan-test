import { Button } from '@/shared/Components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/Components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/shared/Components/ui/radio-group';
import { Textarea } from '@/shared/Components/ui/textarea';
import { IUpdateBookingPayloadRoot } from '@/shared/models/bookinginterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const approvalFormSchema = z
  .object({
    action: z.enum(['APPROVED', 'REJECTED']),
    rejection_reason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.action === 'REJECTED' && !data.rejection_reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rejection reason is required when rejecting a booking',
        path: ['rejection_reason'],
      });
    }
  });

interface IBookingApprovalForm {
  onSubmit: (values: IUpdateBookingPayloadRoot) => Promise<void>;
  onClose: () => void;
}

export default function BookingApprovalForm({
  onSubmit,
  onClose,
}: IBookingApprovalForm) {
  const form = useForm<z.infer<typeof approvalFormSchema>>({
    resolver: zodResolver(approvalFormSchema),
    defaultValues: {
      action: 'APPROVED',
      rejection_reason: '',
    },
  });

  const handleSubmit = (values: IUpdateBookingPayloadRoot) => {
    onSubmit(values);
  };

  const action = form.watch('action');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Action</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="APPROVED" />
                    </FormControl>
                    <FormLabel className="font-normal">Approve</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="REJECTED" />
                    </FormControl>
                    <FormLabel className="font-normal">Reject</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {action === 'REJECTED' && (
          <FormField
            control={form.control}
            name="rejection_reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rejection Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide a reason for rejection"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
