"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";
import animationData from "../public/hero_animation.json";
import { useEffect, useRef, useState, Suspense } from "react";
import { supabase } from "@/utils/supabase";
export default function Home() {
  const [studentData, setStudentData] = useState<any>([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const { data, error } = await supabase.from("student").select("*");
      setStudentData(data?.length);
    };
    fetchStudentData();
  }, []);
  console.log(studentData);
  const lottieRef = useRef<any>(null);
  useEffect(() => {
    lottieRef.current?.setSpeed(0.3);
  }, []);

  return (
    <main className="">
      <div className="bg-offWhite py-10">
        <div className="container mx-auto grid place-items-center py-12">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            className="md:w-1/2 w-3/4"
          />
        </div>
        <div className="container mx-auto text-center flex flex-col justify-center items-center">
          <h1 className="md:text-5xl text-xl font-bold text-fontGreen px-10 ">
            Welcome to Gordon College Research Hub
          </h1>
          <p className="w-2/3 mt-8 md:text-lg text-md font-semibold">
            Gordon College Research Hub is a digital repository of College of
            Computer Science students and creative works of the faculty, and
            researchers from the CCS Department.
          </p>
        </div>
      </div>
      <div className="container-full text-center py-10 bg-white flex flex-col justify-center items-center">
        <h1 className="md:text-3xl text-lg md:w-full w-2/3">
          Our Research Community by the Numbers
        </h1>
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-3 w-full content-center py-10">
            <div> 
              <h1 className="md:text-5xl text-3xl font-bold text-fontGreen">
                {studentData}
              </h1>
              <p className="md:text-xl text-md font-semibold">Students</p>
            </div>
            <div>
              <h1 className="md:text-5xl text-3xl font-bold text-fontGreen">
                {studentData}
              </h1>
              <p className="md:text-xl text-md font-semibold">Students</p>
            </div>
            <div>
              <h1 className="md:text-5xl text-3xl font-bold text-fontGreen">
                {studentData}
              </h1>
              <p className="md:text-xl text-md font-semibold">Students</p>
            </div>
            <div>
              <h1 className="md:text-5xl text-3xl font-bold text-fontGreen">
                {studentData}
              </h1>
              <p className="md:text-xl text-md font-semibold">Students</p>
            </div>
            <div>
              <h1 className="md:text-5xl text-3xl font-bold text-fontGreen">
                {studentData}
              </h1>
              <p className="md:text-xl text-md font-semibold">Students</p>
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
}

function Loading() {
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}
