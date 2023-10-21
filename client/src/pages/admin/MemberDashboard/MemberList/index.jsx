import { useDispatch, useSelector } from "react-redux";
import { getMembers, deleteMember } from "../memberSlice";
import { memberAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const MemberList = ({ setId }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member);

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this member")) {
      memberAPI.getMember(id).then((res) => {
        const currentRef = ref(storage, res.data.thumbnail);
        deleteObject(currentRef);
        dispatch(deleteMember(id));
      });
    }
  };
  const loadHandle = () => {
    dispatch(getMembers({ skip: members.length, limit: 5 }));
  };

  return (
    <DataTable
      fields={["image", "name", "position"]}
      data={members}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default MemberList;
