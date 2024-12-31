import { FormFooter } from '@/shared/Components/FormFooter';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/Components/ui/select';
import { IRootuser } from '@/shared/models/userinterfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditFormProps {
  data: IRootuser | null;
  onSubmit: (data: IRootuser) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  role: z.string().min(1, 'Role is required.'),
});

type FormSchema = z.infer<typeof formSchema>;

export function EditForm({
  data,
  onSubmit,
  onCancel,
  isLoading = false,
}: EditFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
      role: data?.role[0],
    },
  });

  const handleSubmit = (values: FormSchema) => {
    onSubmit(values as IRootuser);
  };

  return (
    <Form {...form}>
      <form
        id="edit-user-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor={'email'} className="capitalize">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder={`Enter Email`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor={'name'} className="capitalize">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder={`Enter Name`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'role'}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor={'role'} className="capitalize">
                Role
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
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
  );
}
