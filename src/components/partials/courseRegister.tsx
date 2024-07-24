"use client";

import { registerSaveAction } from "@/lib/actions";
import { Course, Register } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Confirm from "../utils/confirm";

const CourseRegister = ({ course }: { course: Course }) => {
  const [state, dispatch] = useFormState(registerSaveAction, undefined);
  const [submitErr, setSubmitErr] = useState<{ [key in keyof Register]: string } | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log(state);
    if (state && !state.issues.length) setIsSuccess(true);
    setSubmitErr(
      state?.issues.reduce(
        (obj, error) => Object.assign(obj, { [error.path]: error.message }),
        {}
      ) as { [key in keyof Register]: string } | undefined
    );
  }, [state]);

  const action = (payload: FormData) => {
    payload.set("courseId", course.name);
    dispatch(payload);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/register-form-bg.png)] bg-center bg-cover">
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 mx-8 backdrop-blur-sm shadow-[white_0_0_0.75px] rounded-lg text-light">
        <h2 className="text-center mb-8 text-3xl font-bold before:content-['See_interesting'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          Register this course
        </h2>
        <form action={action} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              placeholder="Jiji"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.name ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, name: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.name}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">Date of birth <span className="text-red-500">*</span></label>
            <input
              name="dob"
              placeholder="Date of birth"
              type="date"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.dob ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, dob: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.dob}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">Email <span className="text-red-500">*</span></label>
            <input
              name="email"
              placeholder="jiji@example.com"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.email ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, email: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.email}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">Phone <span className="text-red-500">*</span></label>
            <input
              name="phone"
              placeholder="0123456789"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.phone ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, phone: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.phone}</p>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-bold">Time slot <span className="text-red-500">*</span></label>
            <select
              name="time"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded *:text-black",
                submitErr?.time ? "border-red-500" : "border-transparent"
              )}
            >
              {course.time.split(";").map((time, index) => (
                <option key={index}>{time}</option>
              ))}
            </select>
            <p className="text-red-500 mt-1 text-sm">{submitErr?.time}</p>
          </div>
          <button className="col-span-2 border-2 border-primary text-primary hover:text-white hover:bg-primary p-4 transition bg-transparent outline-none rounded">
            RIGISTER
          </button>
        </form>
      </div>
      {isSuccess && (
        <Confirm
          title="Register course"
          message={`You have registered the course ${course.name} successfully`}
          type="success"
          close={() => setIsSuccess(false)}
        />
      )}
    </section>
  );
};

export default CourseRegister;
