"use client";

import { useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => void;
}

export function BulkActions({ selectedCount, onBulkDelete }: BulkActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onBulkDelete();
    setShowConfirm(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex justify-end text-white">
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={() => setShowConfirm(true)}
            className="text-xs md:text-base"
          >
            <Trash2 className="md:h-4 md:w-4 h-3 w-3 mr-2" /> Delete Selected (
            {selectedCount})
          </Button>
          <Button className="text-xs md:text-base">
            <RefreshCw className="md:h-4 md:w-4 h-3 w-3 mr-2" /> Re-run Analysis
            ({selectedCount})
          </Button>
        </div>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected URLs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
