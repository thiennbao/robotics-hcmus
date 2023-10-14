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

  const Status = ({ start, end }) => {
    const now = new Date().toISOString();
    if (now < start) {
      return (
        <span className={style.upcoming}>
          <i className="bi bi-circle-fill"></i> Upcoming
        </span>
      );
    } else if (now < end) {
      return (
        <span className={style.ongoing}>
          <i className="bi bi-circle-fill"></i> Ongoing
        </span>
      );
    } else {
      return (
        <span className={style.ended}>
          <i className="bi bi-circle-fill"></i> Ended
        </span>
      );
    }
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
                <Button variant="outline" onClick={() => setId(0)}>
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
                <span>
                  {event.start.split("T")[0]}
                  <i className="bi bi-caret-right-fill text-secondary"></i>{" "}
                  {event.end.split("T")[0]}
                </span>
              </td>
              <td>
                <Status start={event.start} end={event.end} />
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" onClick={() => setId(event._id)}>
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => deleteHandle(event._id)}>
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

export default EventList;
