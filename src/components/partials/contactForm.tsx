"use client";

import { messageSaveAction } from "@/lib/actions";
import { Message } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Confirm from "../utils/confirm";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(messageSaveAction, undefined);
  const [submitErr, setSubmitErr] = useState<{ [key in keyof Message]: string } | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state && !state.issues.length) {
      setIsSuccess(true);
      formRef.current?.reset();
    }
    setSubmitErr(
      state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
        | { [key in keyof Message]: string }
        | undefined
    );
  }, [state]);

  return (
    <section className="min-h-screen py-4 flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/contact-form.png)] bg-center bg-cover">
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 md:p-12 mx-8 backdrop-blur-sm shadow-[white_0_0_0.75px] text-light rounded-lg">
        <h2 className="text-center mb-4 text-3xl font-bold">LIÊN HỆ CHÚNG TÔI</h2>
        <form action={dispatch} ref={formRef} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block mb-1 font-bold">
              Họ tên <span className="text-red-500">*</span>
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
          <div className="col-span-2">
            <label className="block mb-1 font-bold">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              placeholder="..."
              className={clsx(
                "w-full h-32 resize-none p-4 transition bg-transparent outline-none border-2 focus:border-primary shadow-[white_0_0_0.75px] rounded",
                submitErr?.message ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, message: "" })}
            />
            <p className="text-red-500 text-sm">{submitErr?.message}</p>
          </div>
          <button className="col-span-2 border-2 border-primary text-primary hover:text-white hover:bg-primary p-4 transition bg-transparent outline-none rounded">
            GỬI
          </button>
        </form>
      </div>
      {isSuccess && (
        <Confirm
          title="Gửi lời nhắn"
          message="Bạn đã gửi lời nhắn thành công"
          type="success"
          close={() => setIsSuccess(false)}
        />
      )}
    </section>
  );
};

export default ContactForm;
