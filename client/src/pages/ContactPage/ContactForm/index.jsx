import Section from "layouts/partials/Section";
import style from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const onSubmit = (data) => {
    // Wating for backend
    console.log(data)
  }

  return (
    <Section className={style.form}>
      <Appearance type="up">
        <Heading className="text-center fs-2" subcontent="Have other questions?">
          SEND US A MESSAGE
        </Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label>Name</label>
              <input
                placeholder="Name"
                {...register("name", { required: true })}
                aria-invalid={!!errors.name}
                onFocus={() => clearErrors("name")}
              />
              {errors.name && <span>Please fill out this field</span>}
            </div>
            <div className="col-md-6">
              <label>Phone</label>
              <input
                placeholder="Phone"
                {...register("phone", { required: true })}
                aria-invalid={!!errors.phone}
                onFocus={() => clearErrors("phone")}
              />
              {errors.phone && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Email</label>
              <input
                placeholder="Email"
                {...register("email", { required: true })}
                aria-invalid={!!errors.email}
                onFocus={() => clearErrors("email")}
              />
              {errors.email && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Subject</label>
              <input
                placeholder="Subject"
                {...register("subject", { required: true })}
                aria-invalid={!!errors.subject}
                onFocus={() => clearErrors("subject")}
              />
              {errors.subject && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Message</label>
              <textarea
                placeholder="Message"
                {...register("message", { required: true })}
                aria-invalid={!!errors.message}
                onFocus={() => clearErrors("message")}
              />
              {errors.message && <span>Please fill out this field</span>}
            </div>
            <input type="submit" value="SEND MESSAGE" />
          </div>
        </form>
      </Appearance>
    </Section>
  );
};

export default ContactForm;
