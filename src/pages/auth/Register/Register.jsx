import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Label, Radio, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import AppButton from "../../../components/shared/AppButton/AppButton";
import { HiInformationCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const defaultValues = {
  email: "",
  name: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const schema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    name: z.string().min(3, { message: "Name must be 3 letters at least" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-.]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    rePassword: z
      .string()
      .min(8, { message: "Re-Password must be at least 8 characters" }),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    gender: z.literal(["male", "female"], { message: "Gender is required" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"], // This will attach the error to the rePassword field
  });

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function onSubmit(data) {
    console.log(data);

    const { data: response } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      data
    );
    return response;
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      reset();
      toast.success("Registered Successfully!");
      navigate("/login");
    },
    onError: () => {
      console.log(error);
    },
  });

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded-3xl">
          <h1 className="text-center fw-bolder uppercase mb-5">Register</h1>

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
                type="text"
                placeholder="email@gmail.com"
                {...register("email")}
              />

              <ValidationError error={errors.email?.message} />
            </div>

            {/* ****************  Name  **************** */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your Name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Your Name"
                {...register("name")}
              />

              <ValidationError error={errors.name?.message} />
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

            {/* ****************  Re-Password  **************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm Password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                placeholder="********"
                {...register("rePassword")}
              />

              <ValidationError error={errors.rePassword?.message} />
            </div>

            {/* ****************  Date of Birth  **************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
              </div>
              <TextInput
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />

              <ValidationError error={errors.dateOfBirth?.message} />
            </div>

            {/* ****************  Gender  **************** */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender">Gender</Label>
              </div>
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="female" value="female" {...register("gender")} />
                  <Label htmlFor="female">Female</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Radio id="male" value="male" {...register("gender")} />
                  <Label htmlFor="male">Male</Label>
                </div>
              </div>
              <ValidationError error={errors.gender?.message} />{" "}
            </div>

            <AppButton disabled={!isValid} isLoading={isSubmitting}>
              Register
            </AppButton>
          </form>
        </div>
      </div>
    </section>
  );
}
