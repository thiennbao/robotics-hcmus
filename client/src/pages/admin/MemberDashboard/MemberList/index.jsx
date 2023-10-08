import { useDispatch, useSelector } from "react-redux";
import { getMembers, deleteMember } from "../memberSlice";
import Button from "components/Button";
import style from "./MemberList.module.scss";

const MemberList = ({ setId }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member);

  const loadHandle = () => {
    dispatch(getMembers({ skip: members.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteMember(id));
  };

  return (
    <div className={style.memberList}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Position</th>
            <th>
              <div className="d-flex justify-content-center">
                <Button type="outline" onClick={() => setId(0)}>
                  Add New Member
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>
                <img src={member.image} alt="" />
              </td>
              <td>
                <span>{member.name}</span>
              </td>
              <td>
                <span>{member.position}</span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setId(member._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(member._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="outline" className={style.loadButton} onClick={loadHandle}>Load more</Button>
    </div>
  );
};

export default MemberList;
