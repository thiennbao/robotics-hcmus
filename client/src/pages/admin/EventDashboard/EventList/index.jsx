import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "../eventSlice";
import { eventAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const EventList = ({ setId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event);

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this event")) {
      eventAPI.getEvent(id).then((res) => {
        res.data.images &&
          res.data.images.forEach((image) => {
            const currentRef = ref(storage, image);
            deleteObject(currentRef);
          });
        dispatch(deleteEvent(id));
      });
    }
  };
  const loadHandle = () => {
    dispatch(getEvents({ skip: events.length, limit: 5 }));
  };

  return (
    <DataTable
      fields={["title", "start", "end"]}
      data={events.map((event) => {
        const formatDate = { ...event };
        formatDate.start = formatDate.start.split("T")[0];
        formatDate.end = formatDate.end.split("T")[0];
        return formatDate;
      })}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default EventList;
