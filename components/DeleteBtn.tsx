import { MdDelete } from "react-icons/md";
import PleaseWait from "./PleaseWait";
import { MouseEventHandler } from "react";
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
} from "@/components/ui/alert-dialog";

export default function DeleteBtn({
  func,
  deleting,
}: {
  func: MouseEventHandler;
  deleting: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={deleting}
          className={
            "cursor-pointer " +
            (deleting
              ? ""
              : "opacity-0 group-hover:opacity-100 transition-opacity")
          }
        >
          {deleting ? (
            <PleaseWait text={false} />
          ) : (
            <MdDelete
              className="shadow rounded-full p-2 bg-black text-white"
              size={35}
            />
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete it from
            the server with no hope of getting it back.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={func} disabled={deleting}>
            {deleting ? <PleaseWait /> : <p>Continue</p>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
