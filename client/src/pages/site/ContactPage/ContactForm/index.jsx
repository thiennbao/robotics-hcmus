import Section from "components/Section";
import style from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import Heading from "components/Heading";
import Appearance from "components/Appearance";
import { TypingFeild } from "components/Editor";
import { contactAPI } from "api";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const onSubmit = (data) => {
    contactAPI.createContact(data).then(() => {
      window.alert("Send message successfully !!!");
      reset();
    });
  };

  return (
    <Section className="container">
      <Appearance type="up">
        <div className={style.form}>
          <Heading className="text-center fs-2" subcontent="Have other questions?">
            SEND US A MESSAGE
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
              label="Subject"
              placeholder="Subject"
              register={register("subject", { required: true })}
              aria-invalid={!!errors.subject}
              onFocus={() => clearErrors("subject")}
            />
            <TypingFeild
              label="Message"
              textarea
              placeholder="Message"
              register={register("message", { required: true })}
              aria-invalid={!!errors.message}
              onFocus={() => clearErrors("message")}
            />
            <input type="submit" value="SEND MESSAGE" />
          </form>
        </div>
      </Appearance>
    </Section>
  );
};

export default ContactForm;
