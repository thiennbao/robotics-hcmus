import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./eventSlice";
import AdminLayout from "layouts/AdminLayout";
import EventList from "./EventList";
import EventEditor from "./EventEditor";

const EventDashboard = () => {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.event)
  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents({ skip: 0, limit: 5 }));
    }
  }, [events.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="EVENT">
      {id === undefined ? <EventList setId={setId} /> : <EventEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default EventDashboard;
