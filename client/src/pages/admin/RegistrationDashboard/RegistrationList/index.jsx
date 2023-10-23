import { useDispatch, useSelector } from "react-redux";
import { getRegistrations, deleteRegistration } from "../registrationSlice";
import DataTable from "components/DataTable";

const RegistrationList = ({ setId }) => {
  const dispatch = useDispatch();
  const registrations = useSelector((state) => state.registration);
  const data = registrations.map((item) => {
    const dataItem = { ...item };
    dataItem.status = dataItem.status ? "Read" : "Unread";
    return dataItem;
  });

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this registration")) {
      dispatch(deleteRegistration(id));
    }
  };
  const loadHandle = () => {
    dispatch(getRegistrations({ skip: registrations.length, limit: 5 }));
  };

  return (
    <DataTable
      viewOnly
      fields={["name", "course", "status"]}
      data={data}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default RegistrationList;
