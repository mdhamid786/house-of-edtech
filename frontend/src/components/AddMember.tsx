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
import { useState } from "react";
import { postApiData } from "@/helper/common";

// Define types for props
interface AddUserProps {
  userList: () => void;
}

export default function EditUser({ userList }: AddUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // onOpen and onClose are used to control modal visibility
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Form validation
  const isFormValid = name && email && mobile;

  // Handle user update
  const AddUser = async () => {
    if (!isFormValid) {
      toast.error("Please fill all fields before submitting");
      return;
    }

    const apiData = { name, email, mobile };

    try {
      setLoading(true);
      const data = await postApiData(`users`, apiData);

      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        userList(); // Refresh the user list
        onClose(); // Close the modal correctly
      } else {
        toast.error(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
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
      <Button color="primary" onPress={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 256 256"
        >
          <g
            fill="none"
            stroke="#f7f9fa"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={16}
          >
            <circle cx={128} cy={128} r={112} />
            <path d="M 79.999992,128 H 176.0001" />
            <path d="m 128.00004,79.99995 v 96.0001" />
          </g>
        </svg>
        Add New User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        {" "}
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add New User
          </ModalHeader>
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
              onPress={AddUser}
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
