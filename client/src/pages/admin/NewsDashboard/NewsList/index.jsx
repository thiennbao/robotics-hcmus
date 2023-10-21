import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews } from "../newsSlice";
import { newsAPI } from "api";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import DataTable from "components/DataTable";

const NewsList = ({ setId }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const data = news.map((item) => {
    const dataItem = { ...item };
    dataItem.date = item.createdAt.split("T")[0];
    return dataItem;
  });

  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete this news")) {
      newsAPI.getOneNews(id).then((res) => {
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
      data={data}
      actionHandler={[setId, deleteHandle, loadHandle]}
    />
  );
};

export default NewsList;
