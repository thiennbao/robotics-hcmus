import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelines } from "./timelineSlice";
import AdminLayout from "layouts/AdminLayout";
import TimelineEditor from "./TimelineEditor";
import TimelineList from "./TimelineList";

const TimelineDashboard = () => {
  const dispatch = useDispatch();
  const timelines = useSelector((state) => state.timeline);
  useEffect(() => {
    if (!timelines.length) {
      dispatch(getTimelines({ skip: 0, limit: 5 }));
    }
  }, [timelines.length, dispatch]);

  const [id, setId] = useState();

  return (
    <AdminLayout page="TIMELINE">
      {id === undefined ? <TimelineList setId={setId} /> : <TimelineEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default TimelineDashboard;
