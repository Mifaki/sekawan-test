import { Button, ButtonProps } from './ui/button';

interface FormFooterProps {
  primaryText?: string;
  secondaryText?: string;
  primaryProps?: ButtonProps;
  secondaryProps?: ButtonProps;
  isLoading?: boolean;
}

export function FormFooter({
  primaryText = 'Submit',
  secondaryText = 'Cancel',
  primaryProps,
  secondaryProps,
  isLoading = false,
}: FormFooterProps) {
  return (
    <div className="mt-4 flex justify-end space-x-2">
      <Button type="button" variant="outline" {...secondaryProps}>
        {secondaryText}
      </Button>
      <Button type="submit" disabled={isLoading} {...primaryProps}>
        {isLoading ? 'Loading...' : primaryText}
      </Button>
    </div>
  );
}
