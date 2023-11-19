import Image from "next/image";
import { supabase } from "@/utils/supabaseBrowser";
import { useEffect, useState } from "react";
export default function Counter() {
  const [studentData, setStudentData] = useState<number>(0);
  const [facultyData, setFacultyData] = useState<number>(0);
  const [downloadData, setDownloadData] = useState<number>(0);
  const [authorData, setAuthorData] = useState<number>(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: facultyData, error: facultyError } = await supabase
        .from("faculty")
        .select("*");
      const { data: studentData, error: studentError } = await supabase
        .from("student")
        .select("*");

      const { data: downloadData, error: downloadError } = await supabase
        .from("approved_paper")
        .select("download_count");

      const { data: authorData, error: authorError } = await supabase
        .from("author")
        .select("*");

      setAuthorData(authorData?.length || 0);
      setFacultyData(facultyData?.length || 0);
      setStudentData(studentData?.length || 0);
      setDownloadData(
        downloadData?.reduce((acc, curr) => acc + curr.download_count, 0) || 0
      );
    };
    fetchData();
  }, []);
  return (
   <div className="grid md:grid-cols-2  grid-cols-1 gap-x-20 gap-y-5">
     <div className="text-center py-5">
      <div className="flex items-end justify-center  gap-4">
        <div className="md:h-28 md:w-28 h-14 w-14 relative">
          <Image src="/static/images/student.svg" alt="student" fill={true} />
        </div>
        <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">{studentData}</h1>
      </div>
      <p className="text-md font-semibold mt-3">Students Registered</p>
    </div>
    <div className="text-center py-5">
      <div className="flex items-end justify-center  gap-4">
        <div className="md:h-28 md:w-28 h-14 w-14 relative">
          <Image src="/static/images/faculty.svg" alt="faculty" fill={true} />
        </div>
        <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">{facultyData}</h1>
      </div>
      <p className="text-md font-semibold mt-3">faculty Registered</p>
    </div>
    <div className="text-center py-5">
      <div className="flex items-end justify-center  gap-4">
        <div className="md:h-28 md:w-28 h-14 w-14 relative">
          <Image src="/static/images/author.svg" alt="author" fill={true} />
        </div>
        <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">{authorData}</h1>
      </div>
      <p className="text-md font-semibold mt-3">Students Registered</p>
    </div>
    <div className="text-center py-5">
      <div className="flex items-end justify-center  gap-4">
        <div className="md:h-28 md:w-28 h-14 w-14 relative">
          <Image src="/static/images/download.svg" alt="download" fill={true} />
        </div>
        <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">{downloadData}</h1>
      </div>
      <p className="text-md font-semibold mt-3">Students Registered</p>
    </div>
   </div>
  );
}
