"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
  Button,
} from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import AddMember from "@/components/AddMember";
import EditMember from "@/components/EditMember";
import { deleteApiData, getApiData } from "../../helper/common";
import Footer from "@/components/Footer";

interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
}

interface ApiResponse {
  success: boolean;
  users: Student[];
  totalPages: number;
  message?: string;
}

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<Student[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  //   const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
  //     null
  //   );

  const userList = async () => {
    try {
      const apiResData: ApiResponse = await getApiData(`users`);
      if (apiResData.success) {
        setUsers(apiResData.users);
        setTotalPages(apiResData.totalPages);
      } else {
        setUsers([]);
        toast.error(apiResData.message || "Failed to fetch data", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching data", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  useEffect(() => {
    userList();
  }, [page]);

  const handleDelete = async (_id: string) => {
    try {
      const response = await deleteApiData(`users/${_id}`);
      if (response.success) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await userList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-8 mt-4 max-w-5xl">
        <h1 className="text-xl font-bold">All Users</h1>
        <div className="flex w-full justify-between my-4">
          <div className="w-1/2">
            <Input
              labelPlacement="outside"
              name="email"
              className="w-full"
              placeholder="Search"
              type="email"
            />
          </div>
          <AddMember userList={userList} />
        </div>
        <Table
          aria-label="Example table with client-side pagination"
          bottomContent={
            <div className="flex w-full justify-center mt-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          }
          classNames={{ wrapper: "min-h-[222px]" }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="email">EMAIL</TableColumn>
            <TableColumn key="mobile">MOBILE</TableColumn>
            <TableColumn key="action" className="text-center w-32">
              ACTION
            </TableColumn>
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "action" ? (
                      <div className="flex justify-center gap-2">
                        <EditMember userList={userList} user_id={item._id} />

                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(item._id)}
                          aria-label={`Delete ${item.name}`}
                          className="p-1 w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            className="text-red-600"
                          >
                            <path
                              fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                          </svg>
                        </Button>
                      </div>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
<Footer/>
      <Toaster />
    </>
  );
}
