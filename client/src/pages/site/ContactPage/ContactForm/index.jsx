import { useForm } from "react-hook-form";
import style from "./ContactForm.module.scss";
import Button from "components/Button";
import { resourceApi } from "api";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const submit = (data) => {
    resourceApi.postResource({ resource: "contact", data });
    window.alert("Send message successfully");
    reset();
  };

  return (
    <section className={style.contactForm}>
      <div className={style.wrapper}>
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register("name", { required: true })}
            aria-invalid={!!errors.name}
            onFocus={() => clearErrors("name")}
            placeholder="Name"
          />
          <input
            {...register("phone", { required: true })}
            aria-invalid={!!errors.phone}
            onFocus={() => clearErrors("phone")}
            placeholder="Phone"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            aria-invalid={!!errors.email}
            onFocus={() => clearErrors("email")}
            placeholder="Email"
          />
          <input
            {...register("subject", { required: true })}
            aria-invalid={!!errors.subject}
            onFocus={() => clearErrors("subject")}
            placeholder="Subject"
          />
          <textarea
            {...register("message", { required: true })}
            aria-invalid={!!errors.message}
            onFocus={() => clearErrors("message")}
            placeholder="Message"
          />
          <Button className={style.button} variant="outline">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
