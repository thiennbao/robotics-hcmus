import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "api";
import style from "./AuthPage.module.scss";
import Button from "components/Button";
import { useEffect, useState } from "react";
import Header from "layouts/SiteLayout/partials/Header";
import { useCookies } from "react-cookie";
import Loading from "components/Loading";

const AuthPage = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies();
  const [isNotVerified, setIsNotVerified] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const [error, setError] = useState("");

  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        if (res.data.verified) {
          navigate("/admin");
        } else {
          setIsNotVerified(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsNotVerified(true);
      });
  }, [navigate]);

  const submit = (data) => {
    authApi
      .login({ data })
      .then((res) => {
        setCookie("token", res.data);
        navigate("/admin");
      })
      .catch((error) => {
        if (error.response.data) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      });
  };

  return isNotVerified ? (
    <section className={style.authPage}>
      <Header />
      <div className={style.wrapper}>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register("username", { required: true })}
            aria-invalid={!!errors.username}
            onFocus={() => clearErrors("username")}
            placeholder="Username"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            aria-invalid={!!errors.password}
            onFocus={() => clearErrors("password")}
            placeholder="Password"
          />
          <span className={style.error}>{error}</span>
          <Button className={style.button} variant="outline">
            LOG IN
          </Button>
        </form>
      </div>
    </section>
  ) : (
    <Loading fullscreen />
  );
};

export default AuthPage;
