export interface UrlItem {
  id: string;
  url: string;
  status: "active" | "inactive" | "error";
  lastChecked?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddUrlFormProps {
  onSuccess: () => void;
}

export interface BulkActionsProps {
  selectedUrls: string[];
  onComplete: () => void;
}

export interface UrlTableProps {
  selectedUrls: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  refreshTrigger: number;
}
