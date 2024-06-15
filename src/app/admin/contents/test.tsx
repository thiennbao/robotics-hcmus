"use client";

import { useState } from "react";
import { BsChatQuote, BsInfoCircle } from "react-icons/bs";
import { FaLink, FaRegImages } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { LuBadgeInfo, LuCheckCheck } from "react-icons/lu";
import { MdOutlineContactless } from "react-icons/md";
import { PiSealQuestionBold } from "react-icons/pi";
import { ImageField, MultiImageField, TextField } from "../_components/editor";
import { InputField } from "../_components/editorUtils";

export default function ContentsDashboardPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTENTS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl">
        <div className="px-12 py-6 font-bold border-b border-gray-500">Edit content</div>
        <div className="flex py-6 *:px-12">
          <div className="w-72 flex-shrink-0 border-r border-r-gray-500 *:mb-2 *:px-4 *:py-2 *:transition *:rounded-lg *:cursor-pointer">
            <div onClick={() => setTab(1)} className={tab === 1 ? "bg-gray-900" : "bg-gray-600"}>
              <FaRegImages className="inline text-xl mr-2" />
              <span className="align-middle">Wallpaper</span>
            </div>
            <div onClick={() => setTab(2)} className={tab === 2 ? "bg-gray-900" : "bg-gray-600"}>
              <FaLink className="inline text-xl mr-2" />
              <span className="align-middle">Navigation</span>
            </div>
            <div onClick={() => setTab(3)} className={tab === 3 ? "bg-gray-900" : "bg-gray-600"}>
              <LuBadgeInfo className="inline text-xl mr-2" />
              <span className="align-middle">Description</span>
            </div>
            <div onClick={() => setTab(4)} className={tab === 4 ? "bg-gray-900" : "bg-gray-600"}>
              <BsChatQuote className="inline text-xl mr-2" />
              <span className="align-middle">Quote</span>
            </div>
            <div onClick={() => setTab(5)} className={tab === 5 ? "bg-gray-900" : "bg-gray-600"}>
              <LuCheckCheck className="inline text-xl mr-2" />
              <span className="align-middle">Feature</span>
            </div>
            <div onClick={() => setTab(6)} className={tab === 6 ? "bg-gray-900" : "bg-gray-600"}>
              <GoHeart className="inline text-xl mr-2" />
              <span className="align-middle">Testimonial</span>
            </div>
            <div onClick={() => setTab(7)} className={tab === 7 ? "bg-gray-900" : "bg-gray-600"}>
              <MdOutlineContactless className="inline text-xl mr-2" />
              <span className="align-middle">Contact info</span>
            </div>
            <div onClick={() => setTab(8)} className={tab === 8 ? "bg-gray-900" : "bg-gray-600"}>
              <PiSealQuestionBold className="inline text-xl mr-2" />
              <span className="align-middle">FAQs</span>
            </div>
          </div>
          <form className="flex-grow *:mb-4">
            {tab === 1 && (
              <>
                <MultiImageField label="Home page banners" required />
                <ImageField label="About page wallpaper" required />
                <ImageField label="Courses page wallpaper" required />
                <ImageField label="News page wallpaper" required />
                <ImageField label="Contact page wallpaper" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The photos above will appear on top of site pages.
                  </span>
                </div>
              </>
            )}
            {tab === 2 && (
              <>
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <InputField label="Link title" />
                  <InputField label="Address" />
                </div>
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <InputField label="Link title" />
                  <InputField label="Address" />
                </div>
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <InputField label="Link title" />
                  <InputField label="Address" />
                </div>
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <InputField label="Link title" />
                  <InputField label="Address" />
                </div>
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The links above will appear on site header navigation and footer quick links.
                  </span>
                </div>
              </>
            )}
            {tab === 3 && (
              <>
                <TextField label="Description" required />
                <ImageField label="Description left image" required />
                <ImageField label="Description right image" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The content above will be used for about page.
                  </span>
                </div>
              </>
            )}
            {tab === 4 && (
              <>
                <InputField label="Quote title" required />
                <TextField label="Quote content" required />
                <ImageField label="Quote background image" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The content above will be used for about page.
                  </span>
                </div>
              </>
            )}
            {tab === 5 && (
              <>
                <InputField label="Features title" required />
                <ImageField label="Features side image" required />
                <InputField label="Feature title" required />
                <InputField label="Feature content" required />
                <InputField label="Feature title" required />
                <InputField label="Feature content" required />
                <InputField label="Feature title" required />
                <InputField label="Feature content" required />
                <InputField label="Feature title" required />
                <InputField label="Feature content" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The content above will be used for about page.
                  </span>
                </div>
              </>
            )}
            {tab === 6 && (
              <>
                <ImageField label="Testimonial background image" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Testimonial customer name" required />
                  <InputField label="Testimonial customer position" required />
                </div>
                <ImageField label="Testimonial customer image" required />
                <InputField label="Testimonial content" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Testimonial customer name" required />
                  <InputField label="Testimonial customer position" required />
                </div>
                <ImageField label="Testimonial customer image" required />
                <InputField label="Testimonial content" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Testimonial customer name" required />
                  <InputField label="Testimonial customer position" required />
                </div>
                <ImageField label="Testimonial customer image" required />
                <InputField label="Testimonial content" required />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Testimonial customer name" required />
                  <InputField label="Testimonial customer position" required />
                </div>
                <ImageField label="Testimonial customer image" required />
                <InputField label="Testimonial content" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The content above will be used for about page.
                  </span>
                </div>
              </>
            )}
            {tab === 7 && (
              <>
                <InputField label="Location href" required />
                <InputField label="Facebook href" required />
                <InputField label="Email href" required />
                <InputField label="Phone href" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The address above will appear on contact infomations section, site header and
                    footer.
                  </span>
                </div>
              </>
            )}
            {tab === 8 && (
              <>
                <InputField label="Question 1" required />
                <TextField label="Answer 1" required />
                <InputField label="Question 2" required />
                <TextField label="Answer 2" required />
                <InputField label="Question 3" required />
                <TextField label="Answer 3" required />
                <InputField label="Question 4" required />
                <TextField label="Answer 4" required />
                <InputField label="Question 5" required />
                <TextField label="Answer 5" required />
                <InputField label="Question 6" required />
                <TextField label="Answer 6" required />
                <div className="italic text-sky-500">
                  <BsInfoCircle className="inline text-lg mr-1" />
                  <span className="align-middle">
                    The address above will be used for contact page.
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
