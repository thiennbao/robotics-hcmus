import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "./contactSlice";
import AdminLayout from "layouts/AdminLayout";
import ContactView from "./ContactView";
import ContactList from "./ContactList";

const ContactDashboard = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact);
  useEffect(() => {
    if (!contacts.length) {
      dispatch(getContacts({ skip: 0, limit: 5 }));
    }
  }, [contacts.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="CONTACT">
      {id === undefined ? <ContactList setId={setId} /> : <ContactView id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default ContactDashboard;
