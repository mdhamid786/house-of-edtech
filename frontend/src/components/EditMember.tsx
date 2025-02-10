"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getApiData, updateApiData } from "@/helper/common";

// Define types for props
interface EditMemberProps {
  userList: () => void;
  user_id: string;
}

export default function EditMember({ userList, user_id }: EditMemberProps) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // onOpen and onClose are used to control modal visibility
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user data by ID
  const fetchUserData = async (id: string) => {
    try {
      const response = await getApiData(`users/${id}`);
      if (response.success) {
        const { name, mobile, email } = response.user;
        setName(name);
        setMobile(mobile);
        setEmail(email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data.");
    }
  };

  useEffect(() => {
    fetchUserData(user_id); // Fetch user data when component mounts or user_id changes
  }, [user_id]);

  // Form validation
  const isFormValid = name && email && mobile;

  // Handle user update
  const handleUpdateUser = async () => {
    if (!isFormValid) {
      toast.error("Please fill all fields before submitting");
      return;
    }

    const apiData = { name, email, mobile };

    try {
      setLoading(true);
      const data = await updateApiData(`users/${user_id}`, apiData);

      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        userList(); // Refresh the user list
        onClose(); // Close the modal correctly
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="p-1 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100"
        variant="ghost"
        onPress={onOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="#0cbff4"
            d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"
          />
        </svg>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        {" "}
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Update User</ModalHeader>
          <ModalBody>
            <Input
              label="Member Name"
              placeholder="Enter Name"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Member Email"
              placeholder="Enter Email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Mobile No"
              placeholder="Enter Mobile No"
              type="number"
              maxLength={10}
              minLength={10}
              variant="bordered"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              {" "}
              {/* Close modal */}
              Close
            </Button>
            <Button
              color="primary"
              onPress={handleUpdateUser}
              isDisabled={!isFormValid || loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster />
    </>
  );
}
