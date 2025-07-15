import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { urlInputSchema, type UrlInputFormData } from "@/lib/validations/url";

interface AddUrlFormProps {
  onAddUrl: (url: string) => void;
}

export function AddUrlForm({ onAddUrl }: AddUrlFormProps) {
  const form = useForm<UrlInputFormData>({
    resolver: zodResolver(urlInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (data: UrlInputFormData) => {
    onAddUrl(data.url);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  className="placeholder:text-sm md:placeholder:text-base"
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-xs md:text-base">
          <Plus className="md:h-4 md:w-4 h-3 w-3 mr-2" /> Add URL
        </Button>
      </form>
    </Form>
  );
}
