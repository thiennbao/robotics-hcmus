import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getNews } from "../newsSlice";
import Button from "components/Button";
import style from "./NewsList.module.scss";

const NewsList = ({ setId }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  const loadHandle = () => {
    dispatch(getNews({ skip: news.length, limit: 5 }));
  };
  const deleteHandle = (id) => {
    dispatch(deleteNews(id));
  };

  return (
    <div className={style.newsList}>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Date</th>
            <th>
              <div className="d-flex justify-content-center">
                <Button type="outline" onClick={() => setId(0)}>
                  Add New News
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {news.map((news) => (
            <tr key={news._id}>
              <td>
                <img src={news.thumbnail} alt="" />
              </td>
              <td>
                <span>{news.title}</span>
              </td>
              <td>
                <span>{news.updatedAt.split("T")[0]}</span>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button type="outline" onClick={() => setId(news._id)}>
                    Edit
                  </Button>
                  <Button type="outline" onClick={() => deleteHandle(news._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="outline" className={style.loadButton} onClick={loadHandle}>Load more</Button>
    </div>
  );
};

export default NewsList;
