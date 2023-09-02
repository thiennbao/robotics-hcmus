import style from "./Team.module.scss";
import Heading from "components/Heading";
import Member from "./Member";
import Button from "components/Button";

const Team = ({ limit }) => {
  // Call API
  const image = require("assets/about-2.jpg");
  const members = [
    {
      image: image,
      name: "Bao Bao",
      position: "Clown",
    },
    {
      image: image,
      name: "Bao Bao",
      position: "Clown",
    },
    {
      image: image,
      name: "Bao Bao",
      position: "Clown",
    },
    {
      image: image,
      name: "Bao Bao",
      position: "Clown",
    },
  ];

  return (
    <section className="container">
      <Heading Tag="h2" extra subcontent="--- WELCOME TO">
        OUR MEMBER
      </Heading>
      <div className="row">
        {members.map((member, index) => (
          <div key={index} className="col-3 g-5">
            <Member
              image={member.image}
              name={member.name}
              position={member.position}
              facebook={member.facebook}
              instagram={member.instagram}
              linkedin={member.linkedin}
            />
          </div>
        ))}
      </div>
      {limit && (
        <Button className={style.btn} type="shadow" to="/courses">
          See all courses
        </Button>
      )}
    </section>
  );
};

export default Team;
