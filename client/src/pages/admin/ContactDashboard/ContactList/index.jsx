import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../contactSlice";
import DataTable from "components/DataTable";
import { useEffect } from "react";

const ContactList = () => {
  const dispatch = useDispatch();

  const rawContacts = useSelector((state) => state.contact);
  const contacts = rawContacts.map((rawContact) => ({
    date: rawContact.createdAt.split("T")[0],
    ...rawContact,
  }));

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(getContacts({ skip: 0, limit: 5 }));
    }
  }, [contacts, dispatch]);

  const loadHandle = () => {
    dispatch(getContacts({ skip: contacts.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this contact")) {
      dispatch(deleteContact({ id }));
    }
  };

  return (
    <AdminLayout page="CONTACT">
      <DataTable
        fields={["subject", "name", "date"]}
        data={contacts}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={true}
      />
    </AdminLayout>
  );
};

export default ContactList;
