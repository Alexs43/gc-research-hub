"use client";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";

export type Submission = {
  id: string;
  title: string;
  author_name: string;
  author_email: string;
  review_id: string;
  status: string;
};

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author_name",
    header: "Author Name",
  },
  {
    accessorKey: "author_email",
    header: "Author Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "review_id",
    header: "Action",
    cell: ({ row }) => {
      return <ViewRequest row={row} />;
    },
  },
];

const ViewRequest = ({ row }: { row: any }) => {
  const rowId = row.original.review_id;

  return (
    <Button
      className="bg-red-700 hover:bg-red-800"
      key={rowId}
        onClick={() => {
            window.location.href = `/admin/requests/${rowId}`;
        }}  
    >
      View
    </Button>
  );
};
