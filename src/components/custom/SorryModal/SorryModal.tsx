import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  fromFlightPage?: boolean;
};

export function SorryModal({ open, setOpen, fromFlightPage = false }: Props) {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sorry</AlertDialogTitle>
          <AlertDialogDescription className='text-lg'>
            Sorry, I am unable to complete the flight part in this short period
            of time due to my office production release. 😔
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          {fromFlightPage && (
            <AlertDialogAction onClick={() => router.push('/')}>
              See Hotel Implementation
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
