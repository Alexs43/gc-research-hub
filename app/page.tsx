"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";
import animationData from "../public/hero_animation.json";
import { useEffect, useRef, useState, Suspense } from "react";
import { supabase } from "@/utils/supabase";
import Counter from "./components/counter";
export default function Home() {
  const lottieRef = useRef<any>(null);
  useEffect(() => {
    lottieRef.current?.setSpeed(0.3);
  }, []);

  return (
    <main className="">
      <div className="bg-offWhite  ">
        <div className="container mx-auto flex md:justify-center items-center md:h-screen h-fit py-5 flex-col md:flex-row text-center md:text-right">
          <div className="relative md:w-1/2 w-full md:h-full h-52 ">
            <Image
              src="/static/images/design.svg"
              alt="research_design"
              fill={true}
            />
          </div>
          <div className=" flex md:w-1/3 w-4/5 flex-col justify-center  ">
            <h1 className="md:text-5xl text-xl font-bold text-primaryGreen  leading-snug">Welcome to Gordon College Research Hub</h1>
            <p className=" mt-5 text-sm">
              The Gordon College Research Hub is a digital repository of College
              of Computer Science students and creative works of the faculty,
              and researchers from the CCS Department.asdfasdf
            </p>
          </div>
        </div>
      </div>
      <div className="container-full text-center py-10 bg-white flex flex-col justify-center items-center">
        <h1 className="md:text-3xl text-lg md:w-full w-2/3">
          Our Research Community by the Numbers
        </h1>
        <Counter />
      </div>
    </main>
  );
}
