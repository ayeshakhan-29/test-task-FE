import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "sonner";

interface BulkDeleteRequest {
  ids: string[];
}

interface BulkDeleteResponse {
  deleted_count: number;
  message: string;
}

export const useBulkDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<BulkDeleteResponse, Error, BulkDeleteRequest>({
    mutationFn: async ({ ids }) => {
      const response = await api.delete<BulkDeleteResponse>("/bulk-delete", {
        data: { ids: ids.map((id) => parseInt(id, 10)) },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`${data.deleted_count} URLs deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["crawls"] });
    },
    onError: (error) => {
      console.error("Error deleting URLs:", error);
    },
  });
};
