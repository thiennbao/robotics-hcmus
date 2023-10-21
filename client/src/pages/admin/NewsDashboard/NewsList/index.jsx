import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews } from "../newsSlice";
import { newsAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const NewsList = ({ setId }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this course")) {
      newsAPI.getOneNews(id).then((res) => {
        const currentRef = ref(storage, res.data.thumbnail);
        deleteObject(currentRef);
        res.data.images &&
          res.data.images.forEach((image) => {
            const currentRef = ref(storage, image);
            deleteObject(currentRef);
          });
        dispatch(deleteNews(id));
      });
    }
  };
  const loadHandle = () => {
    dispatch(getNews({ skip: news.length, limit: 5 }));
  };

  return (
    <DataTable
      fields={["thumbnail", "title", "date"]}
      data={news.map((item) => {
        const formatDate = { ...item };
        formatDate.date = formatDate.createdAt.split("T")[0];
        return formatDate;
      })}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default NewsList;
