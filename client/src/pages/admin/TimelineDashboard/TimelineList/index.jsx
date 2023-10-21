import { useDispatch, useSelector } from "react-redux";
import { getTimelines, deleteTimeline } from "../timelineSlice";
import { timelineAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const TimelineList = ({ setId }) => {
  const dispatch = useDispatch();
  const timelines = useSelector((state) => state.timeline);
  const data = timelines.map((item) => {
    const dataItem = { ...item };
    dataItem.date = item.date.split("T")[0];
    return dataItem;
  });

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this timeline")) {
      timelineAPI.getTimeline(id).then((res) => {
        res.data.images &&
          res.data.images.forEach((image) => {
            const currentRef = ref(storage, image);
            deleteObject(currentRef);
          });
        dispatch(deleteTimeline(id));
      });
    }
  };
  const loadHandle = () => {
    dispatch(getTimelines({ skip: timelines.length, limit: 5 }));
  };

  return (
    <DataTable
      fields={["title", "date"]}
      data={data}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default TimelineList;
