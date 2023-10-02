import style from "./ApplyForm.module.scss";
import Section from "layouts/partials/Section";
import { useForm } from "react-hook-form";
import Heading from "components/Heading";
import Appearance from "components/Appearance";

const ApplyForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const onSubmit = (data) => {
    // Wating for backend
    console.log(data);
  };

  return (
    <Section className={style.form}>
      <Appearance type="up">
        <Heading className="text-center fs-2" subcontent="Wanna join us?">
          WELCOME <del>TO HELL</del>
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <label>Address</label>
              <input
                placeholder="Address"
                {...register("address", { required: true })}
                aria-invalid={!!errors.address}
                onFocus={() => clearErrors("address")}
              />
              {errors.address && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Question 1</label>
              <input
                placeholder="Question 1"
                {...register("q1", { required: true })}
                aria-invalid={!!errors.q1}
                onFocus={() => clearErrors("q1")}
              />
              {errors.q1 && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Question 2</label>
              <input
                placeholder="Question 2"
                {...register("q2", { required: true })}
                aria-invalid={!!errors.q2}
                onFocus={() => clearErrors("q2")}
              />
              {errors.q2 && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Question 3</label>
              <textarea
                placeholder="Question 3"
                {...register("q3", { required: true })}
                aria-invalid={!!errors.q3}
                onFocus={() => clearErrors("q3")}
              />
              {errors.q3 && <span>Please fill out this field</span>}
            </div>
            <input type="submit" value="APPLY" />
          </div>
        </form>
      </Appearance>
    </Section>
  );
};

export default ApplyForm;
