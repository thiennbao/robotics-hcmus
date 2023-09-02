import style from "./Member.module.scss";

const Member = ({ image, name, position, facebook, instagram, linkedin }) => {
  return (
    <div className={style.member}>
      <div>
        <img src={image} alt="" />
        <div className="text-center pb-4">
          <p className="m-0">{name}</p>
          <p className="m-0">{position}</p>
        </div>
      </div>
      <div className="d-none">
        <a href={facebook}>
          <i className="bi bi-facebook"></i>
        </a>
        <a href={instagram}>
          <i className="bi bi-instagram"></i>
        </a>
        <a href={linkedin}>
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Member;
