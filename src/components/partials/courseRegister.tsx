"use client";

import { registerSaveAction } from "@/lib/actions";
import { Course, Register } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Confirm from "../utils/confirm";

const CourseRegister = ({ course }: { course: Course }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(registerSaveAction, undefined);
  const [submitErr, setSubmitErr] = useState<{ [key in keyof Register]: string } | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state && !state.issues.length) {
      setIsSuccess(true);
      formRef.current?.reset();
    }
    setSubmitErr(
      state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
        | { [key in keyof Register]: string }
        | undefined
    );
  }, [state]);

  const action = (payload: FormData) => {
    payload.set("courseId", course.name);
    dispatch(payload);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/register-form.png)] bg-center bg-cover">
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 mx-8 backdrop-blur-sm shadow-[white_0_0_0.75px] rounded-lg text-light">
        <h2 className="text-center mb-8 text-3xl font-bold">Đăng ký khóa học này</h2>
        <form action={action} ref={formRef} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Họ tên học sinh <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Trần Nguyễn Phúc Khang"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.name ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, name: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.name}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Họ tên phụ huynh <span className="text-red-500">*</span>
            </label>
            <input
              name="parentName"
              placeholder="Nguyễn Thiên Bảo"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.parentName ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, parentName: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.parentName}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              name="dob"
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
            <label className="block mb-1 font-bold">
              Email <span className="text-red-500">*</span>
            </label>
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
            <label className="block mb-1 font-bold">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
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
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Khung giờ <span className="text-red-500">*</span>
            </label>
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
            ĐĂNG KÝ
          </button>
        </form>
      </div>
      {isSuccess && (
        <Confirm
          title="Đăng ký khóa học"
          message={`Bạn đã đăng ký khóa học ${course.name} thành công`}
          type="success"
          close={() => setIsSuccess(false)}
        />
      )}
    </section>
  );
};

export default CourseRegister;
