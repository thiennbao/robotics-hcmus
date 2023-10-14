import { useDispatch, useSelector } from "react-redux";
import { getApplications, deleteApplication } from "../applicationSlice";
import Button from "components/Button";
import style from "./ApplicationList.module.scss";

const ApplicationList = ({ setId }) => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application);

  const loadHandle = () => {
    dispatch(getApplications({ skip: applications.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <div className={style.applicationList}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>
                <span>{application.name}</span>
              </td>
              <td>
                <span>{application.createdAt.split("T")[0]}</span>
              </td>
              <td>
                {application.status ? (
                  <span className={style.read}>
                    <i className="bi bi-circle-fill"></i> Read
                  </span>
                ) : (
                  <span className={style.unread}>
                    <i className="bi bi-circle-fill"></i> Unread
                  </span>
                )}
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" onClick={() => setId(application._id)}>
                    View
                  </Button>
                  <Button variant="outline" onClick={() => deleteHandle(application._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outline" className={style.loadButton} onClick={loadHandle}>
        Load more
      </Button>
    </div>
  );
};

export default ApplicationList;
