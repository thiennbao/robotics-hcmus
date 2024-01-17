import style from "./ErrorPage.module.scss";
import Header from "layouts/SiteLayout/partials/Header";
import { notFound } from "assets";

const ErrorPage = () => {
  return (
    <section className={style.errorPage}>
      <Header />
      <div className={style.wrapper}>
        <img src={notFound} alt="404 Not Found" />
        <h2>404 Not Found</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
