"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/utils/supabaseBrowser";
export default function Logout() {
  const handleLogout = async () => {
    const logout = await supabase.auth.signOut();

    window.location.reload();
  };
  return (
    <button title="Log Out" onClick={handleLogout} className="w-fit border py-2 px-3 rounded-md text-xl hover:bg-offWhite">
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
}
