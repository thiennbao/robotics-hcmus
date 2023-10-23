import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrations } from "./registrationSlice";
import AdminLayout from "layouts/AdminLayout";
import RegistrationView from "./RegistrationView";
import RegistrationList from "./RegistrationList";

const RegistrationDashboard = () => {
  const dispatch = useDispatch();
  const registrations = useSelector((state) => state.registration);
  useEffect(() => {
    if (!registrations.length) {
      dispatch(getRegistrations({ skip: 0, limit: 5 }));
    }
  }, [registrations.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="REGISTRATION">
      {id === undefined ? <RegistrationList setId={setId} /> : <RegistrationView id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default RegistrationDashboard;
