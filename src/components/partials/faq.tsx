import db from "@/lib/db";
import Appear from "../utils/appear";
import { HTMLAttributes } from "react";
import { BsQuestionCircle } from "react-icons/bs";

const Question = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg w-full">
      <div className="flex items-center gap-x-2 mb-2">
        <BsQuestionCircle className="text-2xl text-primary" /> <p className="text-xl font-bold">{question}</p>
      </div>
      <p>{answer}</p>
    </div>
  );
};

const Faq = async (props: HTMLAttributes<HTMLDivElement>) => {
  const faqs = await db.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-6 text-center text-primary text-3xl font-bold">CÂU HỎI THƯỜNG GẶP</h2>
        <div className="grid lg:grid-cols-2 gap-8 overflow-hidden *:flex">
          {faqs.map((faq, index) => (
            <Appear key={faq.question} variant={index % 2 ? "left" : "right"}>
              <Question {...faq} />
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
