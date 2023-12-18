import React from 'react'
import Image from "next/image";
import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase";
import { redirect } from "next/navigation";
import { Tables } from "@/types/supabase"
import { Separator } from '@/components/ui/separator';
import YearCards from '@/components/yearCards';
export default async function Page({ params }: { params: { slug: string, course: string, year: string } }) {
  const slug = params.slug;
  const course = params.course;
  const year = params.year;
  const supabase = await createSupabaseServerClient();
  const { data: department, error: depError } = await supabase.from('colleges').select("college_id").eq("college_code", slug);
  const { data: courseData, error: courseError } = await supabase.from('courses').select("*").eq("course_code", course);
  if (!department || department.length === 0 || !courseData || courseData.length === 0) {
    return redirect("/404");
  }
  const { data: paperRes, error: paperErr } = await supabase.from('published_old_paper').select('*').eq('department_id', department[0].college_id).eq('course_id', courseData[0].course_id).eq('year_id', year)
  return (
    <div className="w-full p-10">
      <div className="container mx-auto text-center">  <h1 className="text-3xl font-bold">{courseData[0].course_name}
        {courseData[0]?.course_major &&
          ` Major in ${courseData[0].course_major}`}</h1></div>
          <Separator className='my-4'/>
      <div className='w-full grid grid-cols-3 gap-5 place-items-center justify-items-center items-center justify-center'>
        {paperRes?.map((paper: Tables<'published_old_paper'>) => (
          <div key={paper?.id}>
            <YearCards paperId={paper?.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
