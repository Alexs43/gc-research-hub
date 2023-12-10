"use client";

import React, { startTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { TagInput, Tag } from "@/components/tag-input";
import readUserSession from "@/utils/actions";
import submitPaper from "@/utils/actions/submitPaper";
import { useToast } from "@/components/ui/use-toast";
const ACCEPTED_FILE_TYPES = ["application/pdf"];
import { supabase } from "@/utils/supabaseBrowser";
import { v4 as uuidv4 } from "uuid";

export const submissionSchema = z.object({
  title: z
    .string({
      required_error: "Please enter a title.",
    })
    .min(1),
  abstract: z
    .string({
      required_error: "Please enter an abstract.",
    })
    .min(1),
  author_id: z.string({
    required_error: "Please enter an author id.",
  }),
  // author : z.array(
  //   z.object({
  //     email: z.string({
  //       required_error: "Please enter an email.",
  //     }),
  //     name: z.string({
  //       required_error: "Please enter a name.",
  //     }),
  //     affiliation: z.string({
  //       required_error: "Please enter an affiliation.",
  //     }),
  //   })
  // ),
  author_role: z.string({
    required_error: "Please select an author role.",
  }),
  keywords: z.array(
    z.object({
      id: z.string(),
      text: z.string({
        required_error: "Please enter a keyword.",
      }),
    })
  ),
  document_file: z
    .custom<File>((val) => val instanceof File, "Please upload a file")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Please choose .pdf format files only",
    }),
  file_path: z.string(),
});
export default function SubmissionForm() {
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [userSession, setUserSession] = useState<string>();
  const [authorCount, setAuthorCount] = useState(1);
  const [userRole, setUserRole] = useState<string>("");
  React.useEffect(() => {
    readUserSession().then((session) => {
      setUserSession(session?.data?.session?.user?.id);
      setUserRole(session?.data?.session?.user?.user_metadata?.role);
    });
  }, []);
  const form = useForm({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      authors: [
        {
          name: "",
          affiliation: "",
          email: "",
        },
      ],

      author_id: userSession || "",
      title: "",
      abstract: "",
      keywords: [] as Tag[],
      document_file: null as any,
      author_role: "",
      file_path: "",
    },
  });
  const { setValue } = form;
  async function onSubmit(data: z.infer<typeof submissionSchema>) {
    data.author_id = userSession || "";
    data.author_role = userRole || "";

    const file_path = `${data.author_id}/${uuidv4()}`;
    data.file_path = file_path;
    console.log(data);
    const { data: uploadRes, error } = await supabase.storage
      .from("documents")
      .upload(file_path, data.document_file);
    console.log(uploadRes);
    if (error) {
      toast({
        title: "Error",
        description: "Error uploading document",
        variant: "destructive",
      });
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("abstract", data.abstract);
      formData.append("author_id", data.author_id);
      formData.append("author_role", data.author_role);
      formData.append("file_path", data.file_path);
      formData.append("document_file", data.document_file);
      formData.append("keywords", JSON.stringify(data.keywords));

      const res = await submitPaper(formData as FormData);
      if (res === "success") {
        toast({
          title: "Success",
          description: "Paper submitted successfully",
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Paper Title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="hidden">
          <FormField
            control={form.control}
            name="author_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="hidden"
                    placeholder="Enter your Paper Title"
                    {...field}
                    value={userSession}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="hidden"
                    placeholder="Enter your Paper Title"
                    {...field}
                    value={userRole}
                  />
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
                  <Input
                    type="hidden"
                    placeholder="Enter your Paper Title"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your Paper Abstract here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter your paper keywords here"
                  tags={tags}
                  className="sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue("keywords", newTags as [Tag, ...Tag[]]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document</FormLabel>
              <FormControl>
                <Input
                  accept="application/pdf"
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
