import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "./classSlice";
import AdminLayout from "layouts/AdminLayout";
import ClassList from "./ClassList";
import ClassEditor from "./ClassEditor";

const CourseDashboard = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class);
  useEffect(() => {
    if (!classes.length) {
      dispatch(getClasses({ skip: 0, limit: 5 }));
    }
  }, [classes.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="CLASS">
      {id === undefined ? <ClassList setId={setId} /> : <ClassEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default CourseDashboard;
