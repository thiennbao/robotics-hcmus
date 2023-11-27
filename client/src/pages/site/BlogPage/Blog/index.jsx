import { Link } from "react-router-dom";
import style from "./Blog.module.scss";

const Blog = ({ content }) => {
  return (
    <div className={style.blog}>
      <Link to={`/blogs/${content._id}`}>
        <img src={content.thumbnail} alt={content.title} />
        <div>
          <h5>{content.title}</h5>
          <p>{new Date(content.updatedAt).toDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
