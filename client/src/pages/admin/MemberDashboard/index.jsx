import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "./memberSlice";
import AdminLayout from "layouts/AdminLayout";
import MemberEditor from "./MemberEditor";
import MemberList from "./MemberList";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member);
  useEffect(() => {
    if (!members.length) {
      dispatch(getMembers({ skip: 0, limit: 5 }));
    }
  }, [members.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="MEMBER">
      {id === undefined ? <MemberList setId={setId} /> : <MemberEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default MemberDashboard;
