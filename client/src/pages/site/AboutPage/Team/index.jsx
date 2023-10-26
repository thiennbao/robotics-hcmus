import clsx from "clsx";
import style from "./Team.module.scss";
import Section from "components/Section";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";
import { useEffect, useState } from "react";
import { memberAPI } from "api";

const Member = ({ image, name, position, quote, links = [] }) => {
  return (
    <div className={style.member}>
      <div className="row g-0">
        <div className="col-md-6 d-flex">
          <img src={image} alt="" />
        </div>
        <div className={clsx(style.info, "col-md-6 text-center")}>
          <p>{name}</p>
          <p>{position}</p>
          <p>
            <i className="bi bi-chat-square-quote-fill"></i> {quote}
          </p>
          <div>
            <a href={`https://facebook.com/${links[0]}`} target="blank">
              <i className="bi bi-facebook"></i>
            </a>
            <a href={`https://instagram.com/${links[1]}`}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href={`https://linkedin.com/${links[2]}`}>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = ({ limit }) => {
  const [members, setMembers] = useState([])
  useEffect(() => {
    memberAPI
      .getMembers(0, limit)
      .then((res) => setMembers(res.data))
      .catch((error) => console.log(error));
  }, [limit]);

  return (
    <Section className={style.team}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">OUR TEAM</Heading>
        <div className="row g-3 my-3">
          {members.map((member, index) => (
            <div key={index} className={clsx(style.wrapper, "col-lg-6")}>
              <Appearance type={index % 2 ? "left" : "right"}>
                {console.log(member)}
                <Member
                  image={member.image}
                  name={member.name}
                  position={member.position}
                  quote={member.quote}
                  links={[member.facebook, member.instagram, member.linkedin]}
                />
              </Appearance>
            </div>
          ))}
        </div>
        {limit && (
          <Appearance type="up">
            <Button className={style.button} variant="shadow" to="/about">
              See all members
            </Button>
          </Appearance>
        )}
      </div>
    </Section>
  );
};

export default Team;
