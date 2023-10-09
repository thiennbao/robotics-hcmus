import { useEffect, useState } from "react";
import { contactAPI } from "api";
import Button from "components/Button";
import style from "./ContactView.module.scss";
import { useDispatch } from "react-redux";
import { setStatusContact } from "../contactSlice";

const ContactView = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({});

  useEffect(() => {
    contactAPI
      .getContact(id)
      .then((res) => {
        setContact(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const setStatusHandle = (id, status) => {
    dispatch(setStatusContact({ id, status }));
    setId();
  };

  return (
    <div className={style.editor}>
      {contact.name ? (
        <form>
          <h3>{`Contact from ${contact.name}`}</h3>
          <div className={style.inputWrapper}>
            <label>Subject</label>
            <input value={contact.subject} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Name</label>
            <input value={contact.name} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Phone</label>
            <input value={contact.phone} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Email</label>
            <input value={contact.email} readOnly />
          </div>
          <div className={style.inputWrapper}>
            <label>Message</label>
            <textarea value={contact.message} readOnly />
          </div>
          <div className={style.buttons}>
            <Button className={contact.status ? style.makeAsUnread : style.makeAsRead} type="outline" onClick={() => setStatusHandle(id, !contact.status)}>
              {contact.status ? "Make as unread" : "Make as read" }
            </Button>
            <Button type="outline" onClick={() => setId()}>
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

export default ContactView;
