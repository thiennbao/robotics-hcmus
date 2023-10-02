import style from "./Faq.module.scss";
import Section from "layouts/partials/Section";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

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

  return (
    <Section>
      <div className="container">
        <Heading className="text-center">Most Popular Questions</Heading>
        <div className={style.faq}>
          <div className="row g-4 align-items-stretch">
            {questions.map((question, index) => (
              <div key={index} className="col-lg-6">
                <Appearance type={index % 2 ? "left" : "right"}>
                  <Question question={question} />
                </Appearance>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Faq;
