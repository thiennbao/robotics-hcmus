import clsx from "clsx";
import style from "./Team.module.scss";
import Section from "layouts/partials/Section";
import Heading from "components/Heading";
import Button from "components/Button";
import Appearance from "components/Appearance";

const Member = ({ image, name, position, qoute, links = {} }) => {
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
            <i className="bi bi-chat-square-quote-fill"></i> {qoute}
          </p>
          <div>
            <a href={links.facebook}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href={links.instagram}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href={links.linkedin}>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = ({ limit }) => {
  // Call API
  const members = [
    {
      image: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",
      name: "Nguyen Thien Bao",
      position: "Clown",
      qoute:
        "We're no strangers to love, you know the rules and so do I, a full commitment's what I'm thinking of you wouldn't get this from any other guy",
    },
    {
      image: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",
      name: "Nguyen Thien Bao",
      position: "Clown",
      qoute: "I just wanna tell you how I'm feeling, gotta make you understand",
    },
    {
      image: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",
      name: "Nguyen Thien Bao",
      position: "Clown",
      qoute:
        "Never gonna give you up, never gonna let you down, never gonna run around and desert you, never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you",
    },
    {
      image: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",
      name: "Nguyen Thien Bao",
      position: "Clown",
      qoute:
        "We've known each other for so long, your heart's been aching, but you're too shy to say it, inside, we both know what's been going on, we know the game and we're gonna play it",
    },
  ];

  return (
    <Section className={style.team}>
      <div className="container">
        <Heading subcontent="--- WELCOME TO">OUR TEAM</Heading>
        <div className="row g-3 my-3">
          {members.map((member, index) => (
            <div key={index} className={clsx(style.wrapper, "col-lg-6")}>
              <Appearance type={index % 2 ? "left" : "right"}>
                <Member
                  image={member.image}
                  name={member.name}
                  position={member.position}
                  qoute={member.qoute}
                />
              </Appearance>
            </div>
          ))}
        </div>
        {limit && (
          <Appearance type="up">
            <Button className={style.button} type="shadow" to="/about">
              See all members
            </Button>
          </Appearance>
        )}
      </div>
    </Section>
  );
};

export default Team;
