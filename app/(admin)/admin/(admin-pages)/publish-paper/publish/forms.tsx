"use client";

import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import publishPaper from "@/utils/actions/publishPaper";

const authorSchema = z.object({
  first_name: z.string().nonempty(),
  middle_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.string({
    required_error: "PLEASE EMAIL",
  }),
  contact_num: z.string().nonempty(),
});

export const paperSchema = z.object({
  authors: z.array(authorSchema),
  title: z.string().nonempty(),
  abstract: z.string().nonempty(),
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
  college_id: z.string(),
  course_id: z.string(),
  year_id: z.string(),
});

export default function Forms() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [courses, setCourses] = useState<any>([]);
  const [colleges, setColleges] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [schoolYear, setSchoolYear] = useState<any>([]);
  const {toast} = useToast();
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(paperSchema),
  });
  const [authors, setAuthors] = useState([
    {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      contact_num: "",
    },
  ]);

  const handleAddAuthor = () => {
    setAuthors([
      ...authors,
      {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        contact_num: "",
      },
    ]);
  };
  const form = useForm({
    resolver: zodResolver(paperSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      authors: [
        {
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          contact_num: "",
        },
      ],
      title: "",
      abstract: "",
      keywords: [] as Tag[],
      document_file: null as any,
      college_id: "",
      course_id: "",
      year_id: "",
    },
  });
  const { setValue } = form;
  const handleRemoveAuthor = (index: number) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  async function fetchCourses(selectedCollege: string) {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("college_id", selectedCollege);
    console.log(data);
    if (error) console.log(error);
    else setCourses(data);
  }
  async function fetchSY() {
    const { data, error } = await supabase.from("school_year").select("*");
    if (error) console.log(error);
    else setSchoolYear(data);
  }
  useEffect(() => {
    async function fetchColleges() {
      const { data, error } = await supabase.from("colleges").select("*");
      console.log(data);
      if (error) console.log(error);
      else setColleges(data);
    }
    fetchSY();
    fetchColleges();
  }, []);
  async function onSubmit(data: z.infer<typeof paperSchema>) {
    // const collegeCode = colleges.find(
    //   (college: any) => college.college_id === data.college_id
    // )?.college_code;
    // const courseCode = courses.find(
    //   (course: any) => course.course_id === data.course_id
    // )?.course_code;
    const title = data.title.replace(/\s+/g, "-").toLowerCase();
    const salt = uuidv4();
    const file_path = `${data.college_id}/${data.course_id}/${data.year_id}/${title + "-" + salt}`;
    const { data: uploadRes, error } = await supabase.storage
      .from("documents")
      .upload(file_path, data.document_file);
    console.log(uploadRes);
    const res = await publishPaper(JSON.stringify(data), file_path);
    if(res == "success"){
      toast({
        title: "Success",
        description: "Paper successfully published",
      });
    }else{
      toast({
        title: "Error",
        description: "Error publishing paper",
        variant: "destructive",
      });
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
          name="college_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  fetchCourses(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the department of the user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {colleges.map((college: any) => (
                    <SelectItem
                      key={college.college_id}
                      value={college.college_id.toString()}
                    >
                      {college.college_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the course of the user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course: any) => (
                    <SelectItem
                      key={course.course_id}
                      value={course.course_id.toString()}
                    >
                      {course.course_name}
                      {course?.course_major &&
                        ` Major in ${course.course_major}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Year of Publication</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the school year the paper was published" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schoolYear.map((year: any) => (
                    <SelectItem
                      key={year.year_id}
                      value={year.year_id.toString()}
                    >
                      {parseInt(year.start_date.split("-")[0], 10)} -{" "}
                      {parseInt(year.end_date.split("-")[0], 10)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {authors.map((author, index) => (
          <div key={index}>
            <div className="flex w-full items-center justify-center gap-5">
              <div className=" w-1/3">
                <FormField
                  control={form.control}
                  name={`authors.${index}.first_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            const updatedAuthors = [...authors];
                            updatedAuthors[index].first_name = e.target.value;
                            setAuthors(updatedAuthors);
                          }}
                          value={author.first_name}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className=" w-1/3">
                <FormField
                  control={form.control}
                  name={`authors.${index}.middle_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Middle Name"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            const updatedAuthors = [...authors];
                            updatedAuthors[index].middle_name = e.target.value;
                            setAuthors(updatedAuthors);
                          }}
                          value={author.middle_name}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name={`authors.${index}.last_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            const updatedAuthors = [...authors];
                            updatedAuthors[index].last_name = e.target.value;
                            setAuthors(updatedAuthors);
                          }}
                          value={author.last_name}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`authors.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            const updatedAuthors = [...authors];
                            updatedAuthors[index].email = e.target.value;
                            setAuthors(updatedAuthors);
                          }}
                          // {...field}
                          value={author.email}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name={`authors.${index}.contact_num`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. 09123456789"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            const updatedAuthors = [...authors];
                            updatedAuthors[index].contact_num = e.target.value;
                            setAuthors(updatedAuthors);
                          }}
                          // {...field}
                          value={author.contact_num}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {index > 0 && (
              <Button
                onClick={() => handleRemoveAuthor(index)}
                className="mt-5"
                variant="destructive"
              >
                <FontAwesomeIcon icon={faTrash} fixedWidth />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddAuthor}
          className="w-full"
          variant="secondary"
        >
          Add Author
        </Button>
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
