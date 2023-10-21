import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "./applicationSlice";
import AdminLayout from "layouts/AdminLayout";
import ApplicationView from "./ApplicationView";
import ApplicationList from "./ApplicationList";

const ApplicationDashboard = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application);
  useEffect(() => {
    if (!applications.length) {
      dispatch(getApplications({ skip: 0, limit: 5 }));
    }
  }, [applications.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="APPLICATION">
      {id === undefined ? <ApplicationList setId={setId} /> : <ApplicationView id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default ApplicationDashboard;
