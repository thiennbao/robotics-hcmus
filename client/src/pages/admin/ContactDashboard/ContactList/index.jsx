import { useDispatch, useSelector } from "react-redux";
import { getContacts, deleteContact } from "../contactSlice";
import DataTable from "components/DataTable";

const ContactList = ({ setId }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact);
  const data = contacts.map((item) => {
    const dataItem = { ...item };
    dataItem.date = dataItem.updatedAt.split("T")[0];
    dataItem.status = dataItem.status ? "Read" : "Unread";
    return dataItem;
  });

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this contact")) {
      dispatch(deleteContact(id));
    }
  };
  const loadHandle = () => {
    dispatch(getContacts({ skip: contacts.length, limit: 5 }));
  };

  return (
    <DataTable
      viewOnly
      fields={["subject", "date", "status"]}
      data={data}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default ContactList;
