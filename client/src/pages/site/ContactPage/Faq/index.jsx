import Appear from "components/Appear";
import style from "./Faq.module.scss";
import { useEffect, useState } from "react";
import { resourceApi } from "api";

const Question = ({ faq }) => {
  return (
    <div className={style.question}>
      <div>
        <i className="bi bi-question-circle"></i>
      </div>
      <div>
        <h6>{faq.question}</h6>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "faq" })
      .then((res) => setFaqs(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className={style.faq}>
      <div className="container">
        <h2 className="text-center mb-4">Most Popular Questions</h2>
        <div className="row g-4 align-items-stretch">
          {faqs.map((faq, index) => (
            <div key={index} className="col-lg-6 d-flex">
              <Appear variant={index % 2 ? "left" : "right"}>
                <Question faq={faq} />
              </Appear>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
