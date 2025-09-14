import axios from "axios";
import { Alert, Button, Label, Radio, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../context/AuthContext";
import { HiInformationCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";


const defaultValues = {
  email: "",
  password: "",
};

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-.]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export function AppLogin() {
  const {setisLogedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(data) {
    console.log(data);

    
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      return response;
     
    } 
  
    const {mutate, isPending, isError, error} = useMutation({
      mutationFn: onSubmit,
      onSuccess: (data) => {
        toast.success("Logged in Successfully!");
        setisLogedIn(data.token);
        localStorage.setItem("userToken",data.token);
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        
      }
    })


  

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded-3xl">
          <h1 className="text-center fw-bolder uppercase mb-5">Login</h1>

          {isError && (
            <Alert className="my-4" color="failure" icon={HiInformationCircle}>
              {error.response.data.error}
            </Alert>
          )}

          <form
            onSubmit={handleSubmit(mutate)}
            className="flex  flex-col gap-4"
          >
            {/* ****************  Email  **************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="email@gmail.com"
                {...register("email")}
              />

              <ValidationError error={errors.email?.message} />
            </div>

            {/* ****************  Password  **************** */}
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

            <AppButton
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Login
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
