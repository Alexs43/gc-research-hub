"use client";

import React from "react";
import readUserSession from "@/utils/actions";
// import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Session,  AuthError  } from "@supabase/supabase-js";
import Link from "next/link";
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type TUser = {
  data: {
      session: Session;
  };
  error: null;
} | {
  data: {
      session: null;
  };
  error: AuthError;
} | {
  data: {
      session: null;
  };
  error: null;
}
async function getUser() {
  const user = await readUserSession();
  return user;
}

export default  function Admin({user}: {user: TUser}) {


  if (user) {
    redirect("/admin/dashboard");
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-screen h-screen flex gap-36 justify-center items-center">
      <div className="w-1/3  justify-center  flex flex-col  h-full">
        <div className="relative  aspect-square ">
          <Image
            src="/static/images/admin-login.svg"
            fill={true}
            alt="GC Logo"
          />
        </div>
        <div className=" flex justify-center items-center  ">
          <div className="relative w-2/12 aspect-square">
            <Image src="/static/images/gc-logo.png" fill={true} alt="GC Logo" />
          </div>
          <div className="relative w-3/12 aspect-square">
            <Image src="/rh_logo.png" fill={true} alt="GH Logo" />
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full flex justify-center items-center">
        <form
          action=""
          className="flex flex-col items-center justify-center w-full px-10"
        >
          <h1 className="text-4xl font-bold">Welcome Admin!</h1>
          <div className="container  md:mt-6 ">
            <div className=" w-full bg-offWhite px-5 py-3 rounded-md border border-[#7A7A7A] flex justify-center items-center">
              <FontAwesomeIcon icon={faCircleUser} />
              <input
                type="text"
                placeholder="Domain Email"
                title="User Email"
                id="user_email"
                {...form.register("email", { required: true })}
                className="bg-inherit ml-2 focus:outline-none w-full font-semibold text-primaryBlack"
                // className="mt-3 w-full rounded-md border-inputBorder border bg-offWhiteInput md:py-3 md:px-3 p-3 shadow-sm text-primaryBlack focus:outline-1 focus:outline-fontGreen placeholder:text-sm font-semibold"
              />
            </div>
            <div className="mt-5 bg-offWhite w-full  px-5 py-3 rounded-md border border-[#7A7A7A] flex justify-center items-center">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                title="User Pass"
                id="user_pass"
                {...form.register("password", { required: true })}
                className="bg-inherit ml-2 focus:outline-none w-full font-semibold text-primaryBlack"
                // className="mt-3 w-full rounded-md border-inputBorder border bg-offWhiteInput md:py-3 md:px-3 p-3 shadow-sm text-primaryBlack focus:outline-1 focus:outline-fontGreen placeholder:text-sm font-semibold"
              />
            </div>
          </div>
          <div className="w-full text-right">
            <Link
              href="/forgot-password"
              className=" text-primaryBlack font-semibold text-sm underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="md:mt-10 mt-5 w-full">
            <button
              className="bg-primaryGreen text-white py-3 px-5 rounded-lg w-full font-bold md:text-xl text-lg hover:bg-darkerGreen transition-colors shadow-sm"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
