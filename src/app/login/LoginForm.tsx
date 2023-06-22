"use client";

import {
  loginFormInput,
  loginFormSchema,
} from "@/lib/validations/loginForm.schema";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const inputClass =
  "block bg-light w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark sm:text-sm sm:leading-6";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setformData] = useState(undefined);

  const { isError, isInitialLoading, data} = useQuery({
    queryKey: ["searchStudent", formData],
    queryFn: async () => {
      const { data } = await axios.get("/api/login", {
        params: {
          admissionNo: formData?.admissionNo,
        },
      });
      return data;
    },
    enabled: !!formData,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  console.log(formData);
  const schema: ZodType<loginFormInput> = loginFormSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormInput>({
    resolver: zodResolver(schema),
  });

  const dialogRef = useRef<HTMLDialogElement>(undefined);

  const submitHandler = (data: FormData) => {
    dialogRef.current?.showModal();
    setformData(data);
  };
  const submitModal = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("admissionNo", data.admissionNo);
    localStorage.setItem("house", data.house);
    console.log(localStorage.getItem("admissionNo"));
    return router.push("/");
  };
  console.log(data);
  return (
    <>
      <Modal
        isInitialLoading={isInitialLoading}
        isError={isError}
        data={data}
        dialogRef={dialogRef}
        submitHandler={submitModal}
        title="Confirm"
      />

      <form
        className="space-y-6 px-4 py-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="admissionNo"
              className="block text-sm font-medium leading-6"
            >
              Admission Number
            </label>
          </div>
          <div>
            <input
              id="admissionNo"
              type="text"
              {...register("admissionNo", { required: true })}
              className={inputClass}
            />
            {errors.admissionNo && (
              <p className=" font-semibold text-sm text-red-500 ">
                {errors.admissionNo.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-brand px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm
          </button>
        </div>
        {isError && (
          <p className=" font-semibold text-l text-red-500 ">
            Enter a correct Admission No
          </p>
        )}
      </form>
    </>
  );
}
