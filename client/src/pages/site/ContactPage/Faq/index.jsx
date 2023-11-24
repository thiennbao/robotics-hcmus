import Appear from "components/Appear";
import style from "./Faq.module.scss";

const questions = [
  {
    qn: "Quis porta class facilisi suspendisse?",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
  {
    qn: "Lectus tellus eu faucibus taciti??",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
  {
    qn: "Fusce class sodales curae elementum?",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
  {
    qn: "Mus justo ligula urna ornare?",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
  {
    qn: "Aliquet consectetuer lobortis malesuada diam habitant suscipit?",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
  {
    qn: "Ut id at fermentum?",
    ans: "Vestibulum sed rhoncus sem consequat enim. Id dapibus augue sociosqu elementum nam nibh fames. Non sapien adipiscing ornare hac nisi pellentesque tristique per faucibus hendrerit.",
  },
];

const Question = ({ question }) => {
  return (
    <div className={style.question}>
      <div>
        <i className="bi bi-question-circle"></i>
      </div>
      <div>
        <h6>{question.qn}</h6>
        <p>{question.ans}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <section className={style.faq}>
      <div className="container">
        <h2 className="text-center mb-4">Most Popular Questions</h2>
        <div className="row g-4 align-items-stretch">
          {questions.map((question, index) => (
            <div key={index} className="col-lg-6 d-flex">
              <Appear variant={index % 2 ? "left" : "right"}>
                <Question question={question} />
              </Appear>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
