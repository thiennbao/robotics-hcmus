import style from "./ApplyForm.module.scss";
import Section from "components/Section";
import { useForm } from "react-hook-form";
import Heading from "components/Heading";
import Appearance from "components/Appearance";
import { TypingFeild } from "components/Editor";
import { applicationAPI } from "api";

const ApplyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const onSubmit = (data) => {
    applicationAPI.createApplication(data).then(() => {
      window.alert("Apply successfully !!!");
      reset();
    });
  };

  return (
    <Section className="container">
      <Appearance type="up">
        <div className={style.form}>
          <Heading className="text-center fs-2" subcontent="Wanna join us?">
            WELCOME <del>TO HELL</del>
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TypingFeild
              label="Name"
              placeholder="Name"
              register={register("name", { required: true })}
              aria-invalid={!!errors.name}
              onFocus={() => clearErrors("name")}
            />
            <TypingFeild
              label="Phone"
              placeholder="Phone"
              register={register("phone", { required: true })}
              aria-invalid={!!errors.phone}
              onFocus={() => clearErrors("phone")}
            />
            <TypingFeild
              label="Email"
              placeholder="Email"
              type="email"
              register={register("email", { required: true })}
              aria-invalid={!!errors.email}
              onFocus={() => clearErrors("email")}
            />
            <TypingFeild
              label="Address"
              placeholder="Address"
              register={register("address", { required: true })}
              aria-invalid={!!errors.address}
              onFocus={() => clearErrors("address")}
            />
            <TypingFeild
              label="Question 1"
              placeholder="Question 1"
              register={register("qn1", { required: true })}
              aria-invalid={!!errors.qn1}
              onFocus={() => clearErrors("qn1")}
            />
            <TypingFeild
              label="Question 2"
              placeholder="Question 2"
              register={register("qn2", { required: true })}
              aria-invalid={!!errors.qn2}
              onFocus={() => clearErrors("qn2")}
            />
            <TypingFeild
              label="Question 3"
              placeholder="Question 3"
              textarea
              register={register("qn3", { required: true })}
              aria-invalid={!!errors.qn3}
              onFocus={() => clearErrors("qn3")}
            />
            <input type="submit" value="APPLY" />
          </form>
        </div>
      </Appearance>
    </Section>
  );
};

export default ApplyForm;
