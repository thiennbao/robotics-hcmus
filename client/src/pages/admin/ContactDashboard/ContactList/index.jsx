import { useDispatch, useSelector } from "react-redux";
import { getContacts, deleteContact } from "../contactSlice";
import Button from "components/Button";
import style from "./ContactList.module.scss";

const ContactList = ({ setId }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact);

  const loadHandle = () => {
    dispatch(getContacts({ skip: contacts.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={style.contactList}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>
                <span>{contact.name}</span>
              </td>
              <td>
                <span>{contact.subject}</span>
              </td>
              <td>
                {contact.status ? (
                  <span className={style.read}>
                    <i className="bi bi-circle-fill"></i> Read
                  </span>
                ) : (
                  <span className={style.unread}>
                    <i className="bi bi-circle-fill"></i> Unread
                  </span>
                )}
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setId(contact._id)}>
                    View
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(contact._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="outline" className={style.loadButton} onClick={loadHandle}>
        Load more
      </Button>
    </div>
  );
};

export default ContactList;
