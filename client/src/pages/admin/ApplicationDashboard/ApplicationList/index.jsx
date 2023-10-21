import { useDispatch, useSelector } from "react-redux";
import { getApplications, deleteApplication } from "../applicationSlice";
import DataTable from "components/DataTable";

const ApplicationList = ({ setId }) => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application);
  const data = applications.map((item) => {
    const dataItem = { ...item };
    dataItem.date = dataItem.updatedAt.split("T")[0];
    dataItem.status = dataItem.status ? "Read" : "Unread";
    return dataItem;
  });

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this application")) {
      dispatch(deleteApplication(id));
    }
  };
  const loadHandle = () => {
    dispatch(getApplications({ skip: applications.length, limit: 5 }));
  };

  return (
    <DataTable
      viewOnly
      fields={["name", "date", "status"]}
      data={data}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default ApplicationList;
