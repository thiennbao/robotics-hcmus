"use client";

import { registerSaveAction } from "@/lib/actions";
import { Course } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Confirm from "../utils/confirm";
import { getRecaptchaToken, RecaptchaScript } from "../utils/recaptchaScript";
import SubmitButton from "../utils/submitButton";

const CourseRegister = ({ course }: { course: Course }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(registerSaveAction, undefined);
  const [submitErr, setSubmitErr] = useState<{ [key: string]: string } | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state && !state.issues.length) {
      setIsSuccess(true);
      formRef.current?.reset();
      setSubmitErr(undefined);
    } else if (state?.issues.length) {
      setSubmitErr(
        state.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as {
          [key: string]: string;
        }
      );
    }
  }, [state]);

  const preDispatch = async (payload: FormData) => {
    payload.set("courseId", course.name);
    const token = await getRecaptchaToken("register_form");
    payload.set("recaptchaToken", token);
    dispatch(payload);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.76),rgba(0,0,0,0.76)),url(/form-background.png)] bg-center bg-cover">
      <RecaptchaScript />
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 mx-8 backdrop-blur-sm shadow-[white_0_0_0.75px] rounded-lg text-light">
        <h2 className="text-center mb-8 text-3xl font-bold">ĐĂNG KÝ KHÓA HỌC NÀY</h2>
        <form action={preDispatch} ref={formRef} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Họ tên học sinh <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Nguyễn Văn A"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.name ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, name: "", general: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.name}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Họ tên phụ huynh <span className="text-red-500">*</span>
            </label>
            <input
              name="parentName"
              placeholder="Nguyễn Thị B"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.parentName ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, parentName: "", general: "" })}
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
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.dob ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, dob: "", general: "" })}
            />
            <p className="text-red-500 mt-1 text-sm">{submitErr?.dob}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-1 font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              placeholder="a@example.com"
              className={clsx(
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.email ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, email: "", general: "" })}
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
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.phone ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, phone: "", general: "" })}
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
                "w-full p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded *:text-black",
                submitErr?.time ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, time: "", general: "" })}
            >
              {course.time.split(";").map((time, index) => (
                <option key={index}>{time}</option>
              ))}
            </select>
            <p className="text-red-500 mt-1 text-sm">{submitErr?.time}</p>
          </div>

          {submitErr?.general && (
            <div className="col-span-2 p-4 bg-red-500/20 border border-red-500/80 rounded-lg text-red-200 text-sm flex items-center gap-3 animate-fadeIn">
              <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{submitErr.general}</span>
            </div>
          )}

          <SubmitButton loadingText="ĐANG ĐĂNG KÝ...">ĐĂNG KÝ</SubmitButton>
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
