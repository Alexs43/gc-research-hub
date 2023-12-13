import React from "react";
import DataTableContainer from "./dt-container";
export const metadata = {
  title: "Submission Review",
  description: "Review submissions",
};
export default async function page() {
  return (
    <div className=" w-full px-10 py-14  overflow-hidden ml-64">
      <h1 className="text-4xl text-primaryBlack py-2">Submission Review</h1>
      <hr className="border-2 border-primaryGreen" />
      <div className="mt-10">
        <DataTableContainer />
      </div>
    </div>
  );
}
