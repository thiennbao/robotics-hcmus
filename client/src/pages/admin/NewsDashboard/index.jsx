import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "./newsSlice";
import AdminLayout from "layouts/AdminLayout";
import NewsList from "./NewsList";
import NewsEditor from "./NewsEditor";

const NewsDashboard = () => {
  const dispatch = useDispatch()
  const news = useSelector((state) => state.news)
  useEffect(() => {
    if (!news.length) {
      dispatch(getNews({ skip: 0, limit: 5 }));
    }
  }, [news.length, dispatch])

  const [id, setId] = useState()

  return (
    <AdminLayout page="NEWS">
      {id === undefined ? <NewsList setId={setId} /> : <NewsEditor id={id} setId={setId} />}
    </AdminLayout>
  );
};

export default NewsDashboard;
