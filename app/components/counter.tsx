import Image from "next/image";
import { supabase } from "@/utils/supabaseBrowser";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
export default function Counter() {
  const [studentData, setStudentData] = useState<number>(0);
  const [facultyData, setFacultyData] = useState<number>(0);
  const [downloadData, setDownloadData] = useState<number>(0);
  const [authorData, setAuthorData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      let authorCount: number | undefined = undefined;
      let studentCount: number | undefined = undefined;
      let downloadCount: number | undefined = undefined;
      let facultyCount: number | undefined = undefined;
      try {
        const { data: facultyData, error: facultyError } = await supabase
          .from("faculty")
          .select("*");
        facultyCount = facultyData?.length;
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .select("*");
        studentCount = studentData?.length;
        const { data: downloadData, error: downloadError } = await supabase
          .from("approved_paper")
          .select("download_count");
        downloadCount =
          downloadData?.reduce((acc, curr) => acc + curr.download_count, 0) ||
          0;
        const { data: authorData, error: authorError } = await supabase
          .from("author")
          .select("*");
        authorCount = authorData?.length;
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setAuthorData(authorCount || 0);
        setFacultyData(facultyCount || 0);
        setStudentData(studentCount || 0);
        setDownloadData(downloadCount || 0);
        setLoading(false);
      }
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
          <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">
            <ColorRing visible={loading} width={80} height={80} colors={['#31572C', '#31572C' , '#31572C' , '#31572C' , '#31572C']} />
            {!loading && studentData}
          </h1>
        </div>
        <p className="text-md font-semibold mt-3">Students Registered</p>
      </div>
      <div className="text-center py-5">
        <div className="flex items-end justify-center  gap-4">
          <div className="md:h-28 md:w-28 h-14 w-14 relative">
            <Image src="/static/images/faculty.svg" alt="faculty" fill={true} />
          </div>
          <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">
            <ColorRing visible={loading} width={80} height={80} colors={['#31572C', '#31572C' , '#31572C' , '#31572C' , '#31572C']} />
            {!loading && facultyData}
          </h1>
        </div>
        <p className="text-md font-semibold mt-3">Faculty Registered</p>
      </div>
      <div className="text-center py-5">
        <div className="flex items-end justify-center  gap-4">
          <div className="md:h-28 md:w-28 h-14 w-14 relative">
            <Image src="/static/images/author.svg" alt="author" fill={true} />
          </div>
          <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">
            <ColorRing visible={loading} width={80} height={80} colors={['#31572C', '#31572C' , '#31572C' , '#31572C' , '#31572C']} />
            {!loading && authorData}
          </h1>
        </div>
        <p className="text-md font-semibold mt-3">Author Registered</p>
      </div>
      <div className="text-center py-5">
        <div className="flex items-end justify-center  gap-4">
          <div className="md:h-28 md:w-28 h-14 w-14 relative">
            <Image
              src="/static/images/download.svg"
              alt="download"
              fill={true}
            />
          </div>
          <h1 className="md:text-7xl text-4xl font-bold text-primaryGreen">
            <ColorRing visible={loading} width={80} height={80} colors={['#31572C', '#31572C' , '#31572C' , '#31572C' , '#31572C']} />
            {!loading && downloadData}
          </h1>
        </div>
        <p className="text-md font-semibold mt-3">Research Downloaded</p>
      </div>
    </div>
  );
}
