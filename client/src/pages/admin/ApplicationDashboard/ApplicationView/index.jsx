import { useEffect, useState } from "react";
import { applicationAPI } from "api";
import Button from "components/Button";
import style from "./ApplicationView.module.scss";
import { useDispatch } from "react-redux";
import { setStatusApplication } from "../applicationSlice";

const ApplicationView = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [application, setApplication] = useState({});

  useEffect(() => {
    applicationAPI
      .getApplication(id)
      .then((res) => {
        setApplication(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const setStatusHandle = (id, status) => {
    dispatch(setStatusApplication({ id, status }));
    setId();
  };

  return (
    <div className={style.editor}>
      {application.name ? (
        <form>
          <h3>{`Application from ${application.name}`}</h3>
          <div className={style.inputWrapper}>
            <label>Name</label>
            <input value={application.name} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Phone</label>
            <input value={application.phone} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Email</label>
            <input value={application.email} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Address</label>
            <input value={application.address} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Question 1</label>
            <input value={application.qn1} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Question 2</label>
            <input value={application.qn2} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Question 3</label>
            <textarea value={application.qn3} readOnly />
          </div>
          {/* Add question here if need more */}
          <div className={style.buttons}>
            <Button className={application.status ? style.makeAsUnread : style.makeAsRead} variant="outline" onClick={() => setStatusHandle(id, !application.status)}>
              {application.status ? "Make as unread" : "Make as read" }
            </Button>
            <Button variant="outline" onClick={() => setId()}>
              Close
            </Button>
          </div>
        </form>
      ) : (
        <h3>
          <span>Loading</span>
          <span className="spinner-border mx-3" role="status"></span>
        </h3>
      )}
    </div>
  );
};

export default ApplicationView;
