import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../contactSlice";

const ContactList = ({ pick }) => {
  const dispatch = useDispatch();
  const rawContacts = useSelector((state) => state.contact);
  const contacts = rawContacts.map((rawContact) => {
    const contact = { ...rawContact };
    contact.date = rawContact.createdAt.split("T")[0];
    return contact;
  });

  const loadHandle = () => {
    dispatch(getContacts({ skip: contacts.length, limit: 5 }));
  };

  const removeHandle = (id) => {
    if (window.confirm("Are you sure to delete this contact")) {
      dispatch(deleteContact({ id }));
    }
  };

  return (
    <DataTable
      fields={["subject", "name", "date"]}
      data={contacts}
      pick={pick}
      remove={removeHandle}
      load={loadHandle}
      readOnly
    />
  );
};

export default ContactList;
