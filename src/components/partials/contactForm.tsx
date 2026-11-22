"use client";

import { messageSaveAction } from "@/lib/actions";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Confirm from "../utils/confirm";
import { getRecaptchaToken, RecaptchaScript } from "../utils/recaptchaScript";
import SubmitButton from "../utils/submitButton";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(messageSaveAction, undefined);
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

  const handleSubmit = async (formData: FormData) => {
    const token = await getRecaptchaToken("contact_form");
    formData.set("recaptchaToken", token);
    dispatch(formData);
  };

  return (
    <section className="min-h-screen py-4 flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.76),rgba(0,0,0,0.76)),url(/form-background.png)] bg-center bg-cover">
      <RecaptchaScript />
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 md:p-12 mx-8 backdrop-blur-sm shadow-[white_0_0_0.75px] text-light rounded-lg">
        <h2 className="text-center mb-4 text-3xl font-bold">LIÊN HỆ CHÚNG TÔI</h2>
        <form action={handleSubmit} ref={formRef} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block mb-1 font-bold">
              Họ tên <span className="text-red-500">*</span>
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
          <div className="col-span-2">
            <label className="block mb-1 font-bold">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              placeholder="..."
              className={clsx(
                "w-full h-32 resize-none p-4 transition bg-transparent outline-none border-2 focus:border-gray-300 shadow-[white_0_0_0.75px] rounded",
                submitErr?.message ? "border-red-500" : "border-transparent"
              )}
              onChange={() => setSubmitErr(submitErr && { ...submitErr, message: "", general: "" })}
            />
            <p className="text-red-500 text-sm">{submitErr?.message}</p>
          </div>

          {submitErr?.general && (
            <div className="col-span-2 p-4 bg-red-500/20 border border-red-500/80 rounded-lg text-red-200 text-sm flex items-center gap-3 animate-fadeIn">
              <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{submitErr.general}</span>
            </div>
          )}

          <SubmitButton loadingText="ĐANG GỬI...">GỬI</SubmitButton>
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
