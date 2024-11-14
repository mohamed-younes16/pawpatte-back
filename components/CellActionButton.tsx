"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import {
  ClipboardEdit,
  CopyIcon,
  GripVertical,
  LucideTrash2,
} from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface CellActionButtonProps {
  dataId: string; // Accepts the id directly
  routeName: string; // The dynamic route name prop
  edit: boolean;
}

const CellActionButton = ({
  dataId,
  routeName,
  edit,
}: CellActionButtonProps) => {
  const { storeId } = useParams();
  const router = useRouter();

  const copy = () => {
    navigator.clipboard.writeText(dataId);
    toast.success("Copied");
  };

  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `/api/stores/${storeId}/${routeName}/${dataId}`
      );
      toast.success(response.data.message, { invert: true });
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error happened", {
        invert: true,
      });
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="shadow-none" asChild>
          <Button variant="ghost" className="p-2 rounded-full">
            <GripVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 font-bold">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {edit && (
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/${storeId}/${routeName}/${dataId}`)
              }
              className="flex items-center gap-3"
            >
              <ClipboardEdit /> Edit
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={copy} className="flex items-center gap-3">
            <CopyIcon /> Copy
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex text-red-600 items-center gap-3">
              <LucideTrash2 /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your item
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteItem}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CellActionButton;
