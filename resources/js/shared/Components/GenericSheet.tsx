import { SheetType } from '@/shared/models/generalinterfaces';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface SheetConfig {
  title: {
    edit?: string;
    create?: string;
    view?: string;
    authorize?: string;
  };
  description: {
    edit?: string;
    create?: string;
    view?: string;
    authorize?: string;
  };
}

interface GenericSheetProps {
  sheetId: string;
  isOpen: boolean;
  onClose: () => void;
  type: SheetType;
  config: SheetConfig;
  sheetContent: Partial<Record<SheetType, JSX.Element>>;
}

export function GenericSheet({
  sheetId,
  isOpen,
  onClose,
  type,
  config,
  sheetContent,
}: GenericSheetProps) {
  const getSheetProps = () => {
    switch (type) {
      case 'view':
        return {
          side: 'bottom' as const,
          className: 'h-[85dvh] w-full',
        };
      default:
        return {
          side: 'right' as const,
          className: 'sm:max-w-xl',
        };
    }
  };

  const { side, className } = getSheetProps();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{config.title[type]}</SheetTitle>
          <SheetDescription>{config.description[type]}</SheetDescription>
        </SheetHeader>
        <div id={sheetId} className="mt-6">
          {sheetContent[type]}
        </div>
      </SheetContent>
    </Sheet>
  );
}
