"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import AppButton from "../../components/shared/AppButton/AppButton";
import ValidationError from "../../components/shared/ValidationError/ValidationError";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function ChangePasswordModel({ openModal, setOpenModal }) {
    const {setisLogedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const changePasswordSchema = z.object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-.]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-.]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  });

  const defaultValues = {
    password: "",
    newPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(changePasswordSchema) });

  async function onSubmit(data) {
    console.log(data);

    const { data: response } = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      data,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return response;
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
        setisLogedIn(null);
        localStorage.removeItem("userToken");
        navigate("/login");     
      
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="border-0"></ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(mutate)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your Password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />

              <ValidationError error={errors.password?.message} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="newPassword">New Password</Label>
              </div>
              <TextInput
                id="newPassword"
                type="password"
                placeholder="********"
                {...register("newPassword")}
              />

              <ValidationError error={errors.newPassword?.message} />

              <AppButton
                
                className="mt-4 w-full"
                type="submit"
                disabled={!isValid}
                isLoading={isPending}
              >
                Change Password
              </AppButton>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
