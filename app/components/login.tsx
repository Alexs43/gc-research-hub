"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "../auth-server-action/action";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

export default function Login({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await signIn({
        email: data.email,
        password: data.password,
      });
  
      console.log(result);

      // Handle the result as needed (e.g., show error messages, redirect, etc.)
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Login failed:", error);
    }
  }
 if(!showModal) return null;

  return (
    <div className="h-screen w-screen flex justify-center items-center fixed top-0 bg-[rgb(0,0,0,0.3)] z-30">
      <div
        className="h-full w-full absolute top-0 right-0"
        onClick={() => setShowModal(false)}
      ></div>
      <form className="px-10 py-6 md:w-3/12 w-10/12  h-fit bg-offWhite rounded-xl relative z-50" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl md:text-3xl font-bold ">Log In</h2>{" "}
          <button
            type="button"
            title="close"
            onClick={() => {
              setShowModal(false);
            }}
            className="text-3xl md:text-4xl  py-2 px-4 grid place-items-center rounded-lg "
          >
            &times;
          </button>
        </div>
        <div className="container  md:mt-6 mt-3">
          <div className="">
            <h1 className=" text-md text-[#7A7A7A]">Email</h1>
            <input
              type="text"
              placeholder="Enter your GC domain address"
              title="User Email"
              id="user_email"
              {...form.register("email", { required: true })}
              className="mt-3 w-full rounded-md border-inputBorder border bg-offWhiteInput md:py-3 md:px-3 p-3 shadow-sm text-primaryBlack focus:outline-1 focus:outline-fontGreen placeholder:text-sm font-semibold"
            />
          </div>
          <div className="mt-5">
            <h1 className=" text-md text-[#7A7A7A]">Password</h1>
            <input
              type="password"
              placeholder="Enter your password"
              title="User Pass"
              id="user_pass"
              {...form.register("password", { required: true })}
              className="mt-3 w-full rounded-md border-inputBorder border bg-offWhiteInput md:py-3 md:px-3 p-3 shadow-sm text-primaryBlack focus:outline-1 focus:outline-fontGreen placeholder:text-sm font-semibold"
            />
          </div>
        </div>
        <Link href="/" className=" ">
          <h1 className="underline text-sm md:text-lg text-[#7A7A7A] text-right font-bold mt-5 hover:text-[#505050] transition-all">
            Forgot password?
          </h1>
        </Link>
        <div className="md:mt-10 mt-5">
          <button className="bg-primaryGreen text-white py-3 px-5 rounded-lg w-full font-bold md:text-xl text-lg hover:bg-darkerGreen transition-colors shadow-sm" type="submit">
            Log In
          </button>
        </div>
        <div className="md:mt-10 mt-5">
          <p className="text-xs md:text-sm text-center">By clicking the login button, you recognize the authority of Gordon College to process your personal and sensitive information, pursuant to the <Link href="/" className="underline text-primaryGreen font-semibold">Gordon College General Privacy Notice</Link> and applicable laws.</p>
        </div>
      </form>
    </div>
  );
}


