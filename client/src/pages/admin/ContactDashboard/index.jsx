import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "./contactSlice";
import { useEffect, useState } from "react";
import ContactList from "./ContactList";
import ContactEditor from "./ContactEditor";
import AdminLayout from "layouts/AdminLayout";

const ContactDashboard = () => {
  const contacts = useSelector((state) => state.contact);

  // Get first 5 items
  const dispatch = useDispatch();
  useEffect(() => {
    if (!contacts.length) {
      dispatch(getContacts({ skip: 0, limit: 5 }));
    }
  }, [contacts.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="CONTACT">
      {id === undefined ? (
        <ContactList pick={setId} />
      ) : (
        <ContactEditor id={id} goBack={() => setId(undefined)} />
      )}
    </AdminLayout>
  );
};

export default ContactDashboard;
