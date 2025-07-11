"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
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

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button variant="destructive" onClick={() => setShowConfirm(true)}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete Selected ({selectedCount})
        </Button>
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
            <AlertDialogAction onClick={onBulkDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
