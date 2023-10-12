import { useDispatch, useSelector } from "react-redux";
import { getClasses, deleteClass } from "../classSlice";
import Button from "components/Button";
import style from "./ClassList.module.scss";

const ClassList = ({ setId }) => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class);

  const loadHandle = () => {
    dispatch(getClasses({ skip: classes.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteClass(id));
  };

  return (
    <div className={style.classList}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Teacher</th>
            <th>
              <div className="d-flex justify-content-center">
                <Button type="outline" onClick={() => setId(0)}>
                  Add New Class
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((item) => (
            <tr key={item._id}>
              <td>
                <span>{item.name}</span>
              </td>
              <td>
                <span>{item.time}</span>
              </td>
              <td>
                <span>{item.teacher}</span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setId(item._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(item._id)}>
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

export default ClassList;
