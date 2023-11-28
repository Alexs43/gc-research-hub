"use client";

import React from "react";
import readUserSession from "@/utils/actions";
import { useState, useEffect } from "react";
import ForbiddenPage from "@/app/components/403";
export default function Admin() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const getUser = async () => {
      const userSession = await readUserSession();
      setUser(userSession);
      
    };
    getUser();
  }, []);

//   if(user?.data?.session?.user?.role !== "admin"){
//     return <ForbiddenPage />
//   }

  
  return <div>page</div>;
}
