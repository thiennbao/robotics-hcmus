import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "api";
import style from "./AuthPage.module.scss";
import Button from "components/Button";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        if (res.data.verified) {
          navigate("/admin");
        }
      })
      .catch((errors) => console.log(errors));
  }, [navigate]);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const submit = (data) => {
    authApi
      .login({ data })
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => console.log(error.response.data.message));
    reset();
  };

  return (
    <section className={style.auth}>
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
          <Button className={style.button} variant="outline">
            LOG IN
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AuthPage;
