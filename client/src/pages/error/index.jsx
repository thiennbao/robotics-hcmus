import { Link } from "react-router-dom";
import style from "./ErrorPage.module.scss";
import { notFound } from "assets";
import Header from "layouts/SiteLayout/partials/Header";

const ErrorPage = () => {
  return (
    <section className={style.errorPage}>
      <Header />
      <div className={style.wrapper}>
        <img src={notFound} alt="404 Not Found" />
        <p className="mt-3 text-white">
          <span>Page not found. </span>
          <Link to="/" className="text-white text-decoration-underline">
            Return home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
