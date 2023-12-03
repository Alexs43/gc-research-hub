"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "../../auth-server-action/action";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseBrowser";
import { useRouter } from 'next/navigation';
import "../../globals.css"
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
export default function Page() {
  const [user, setUser] = React.useState<any>();
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getSession();
      setUser(user);      
      if(user?.data?.session !== null) {
        router.push("/admin/dashboard");  
      }
    };
    getUser();
    
  }, []);

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

      window.location.reload();

      // Handle the result as needed (e.g., show error messages, redirect, etc.)
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Login failed:", error);
    }
  }
 
  return (
    <div className="flex flex-col py-24  items-center bg-[#F0F0F1] h-screen">
      <div className="relative w-1/12 aspect-square">
        <Image src="/rh_logo.png" fill={true} alt="GH Logo" />
      </div>
      <div className="w-3/12 py-3 px-5 shadow-sm rounded-md bg-white border">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container ">
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
            <div className="md:mt-10 mt-5">
              <button
                className="bg-primaryGreen text-white py-3 px-5 rounded-lg w-full font-bold md:text-xl text-lg hover:bg-darkerGreen transition-colors shadow-sm"
                type="submit"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
