import Appear from "../utils/appear";
import { HTMLAttributes } from "react";
import { BsQuestionCircle } from "react-icons/bs";

const Question = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="bg-gray-100 p-6 flex items-center rounded-lg">
      <div className="mr-6">
        <BsQuestionCircle className="text-2xl text-primary" />
      </div>
      <div>
        <p className="text-xl font-bold mb-2">{question}</p>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const Faq = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-6 text-center text-3xl font-bold before:content-['FAQ'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          Most Popular Questions
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">
          <Appear variant="right">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
          <Appear variant="right">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
          <Appear variant="right">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Quis porta class facilisi suspendisse?"
              answer="Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit."
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Faq;
