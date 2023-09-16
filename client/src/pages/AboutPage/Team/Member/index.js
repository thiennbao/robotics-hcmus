import style from "./Member.module.scss";

const Member = ({ image, name, position, facebook, instagram, linkedin }) => {
  return (
    <div className={style.member}>
      <img src={image} alt="" />
      <div className="position-absolute top-0">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div>
            <p className="m-0">{name}</p>
            <p className="m-0">- {position} -</p>
          </div>
          <div>
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
      </div>
    </div>
  );
};

export default Member;
