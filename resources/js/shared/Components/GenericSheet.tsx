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
  };
  description: {
    edit?: string;
    create?: string;
    view?: string;
  };
}

interface GenericSheetProps {
  isOpen: boolean;
  onClose: () => void;
  type: SheetType;
  config: SheetConfig;
  sheetContent: Partial<Record<SheetType, JSX.Element>>;
}

export function GenericSheet({
  isOpen,
  onClose,
  type,
  config,
  sheetContent,
}: GenericSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{config.title[type]}</SheetTitle>
          <SheetDescription>{config.description[type]}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">{sheetContent[type]}</div>
      </SheetContent>
    </Sheet>
  );
}
