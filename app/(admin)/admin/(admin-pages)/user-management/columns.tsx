"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import deleteUser from "@/utils/actions/deleteUser";
import { useToast } from '@/components/ui/use-toast';
async function deleteUserData(id: string) {
  const res = await deleteUser(id);
  return res;
}
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export type Student = {
  id: string;
  full_name: string;
  email: string;
  year_level: string;
  college_id: string;
  action: string;
};
export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "year_level",
    header: "Year Level",
  },

  {
    accessorKey: "college_id",
    header: "College",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <DeleteButton row={row} />;
    },
  },
];

const DeleteButton = ({row} : {row: any})=>{
  const { toast } = useToast();
  const rowId = row.original.id;
  return (
    <Button
      className="bg-red-700 hover:bg-red-800"
      key={rowId}
      onClick={async () => {
        const res = await deleteUserData(rowId);
        if(res === "success"){
          toast({
            title: "User deleted successfully",
            variant: "destructive",
          });
        }
      }}
    >
      <FontAwesomeIcon icon={faTrash} fixedWidth={true} />
    </Button>
  );
}