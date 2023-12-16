"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import addComments from "@/utils/actions/addComments";
import { toast } from "@/components/ui/use-toast";
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const commmentSchema = z.object({
  comment: z
    .string({
      required_error: "Please enter a comment.",
    })
    .min(1),
  status: z.string({
    required_error: "Please enter a status.",
  }),
  review_id: z.string({
    required_error: "Please enter a review_id.",
  }),
  comment_owner_id: z.string(),
  attachment: z
    .custom<File>()
    .optional()
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type || "") || (file?.size ?? 0) <= 0,
      {
        message: "Please upload a valid file type.",
      }
    ),
  file_path: z.string(),
});
export default function Forms({
  status,
  review_id,
  current_user,
}: {
  status: string;
  review_id: string;
  current_user: string;
}) {
  const form = useForm({
    resolver: zodResolver(commmentSchema),
    defaultValues: {
      comment: "",
      status: status,
      review_id: review_id,
      comment_owner_id: current_user,
      attachment: new File([""], "filename"),
      file_path: "",
    },
  });
  async function onSubmit(values: z.infer<typeof commmentSchema>) {
    // const res = await addComments(values);
    console.log(values);
    // if (res !== "success") {
    //   toast({
    //     title: "Error",
    //     description: "Something went wrong.",
    //     variant: "destructive",
    //   });
    // } else {
    //   toast({
    //     title: "Success",
    //     description: "Comment added.",
    //   });
    //   window.location.reload();
    // }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your comment here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="hidden">
          <FormField
            control={form.control}
            name="review_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your comment here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment_owner_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your comment here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file_path"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your comment here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Revision Requested">
                    Revision Requested
                  </SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachment</FormLabel>
              <FormControl>
                <Input
                  accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
