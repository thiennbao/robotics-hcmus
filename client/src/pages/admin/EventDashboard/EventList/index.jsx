import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvents } from "../eventSlice";
import style from "./EventList.module.scss";
import Button from "components/Button";

const EventList = ({ setId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event);

  const loadHandle = () => {
    dispatch(getEvents({ skip: events.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className={style.eventList}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>
              <div className="d-flex justify-content-center">
                <Button type="outline" onClick={() => setId(0)}>
                  Add New Event
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>
                <span>{event.title}</span>
              </td>
              <td>
                <span>From {(new Date(event.start)).toDateString()} to {(new Date(event.end)).toDateString()}</span>
              </td>
              <td>
                <span>{event.status}</span>
              </td>
              <td colSpan={20}>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setId(event._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(event._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="outline" className={style.loadButton} onClick={loadHandle}>
        Load more
      </Button>
    </div>
  );
};

export default EventList;
