import style from "./ApplyForm.module.scss";
import Section from "components/Section";
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
                {...register("qn1", { required: true })}
                aria-invalid={!!errors.qn1}
                onFocus={() => clearErrors("qn1")}
              />
              {errors.qn1 && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Question 2</label>
              <input
                placeholder="Question 2"
                {...register("qn2", { required: true })}
                aria-invalid={!!errors.qn2}
                onFocus={() => clearErrors("qn2")}
              />
              {errors.qn2 && <span>Please fill out this field</span>}
            </div>
            <div>
              <label>Question 3</label>
              <textarea
                placeholder="Question 3"
                {...register("qn3", { required: true })}
                aria-invalid={!!errors.qn3}
                onFocus={() => clearErrors("qn3")}
              />
              {errors.qn3 && <span>Please fill out this field</span>}
            </div>
            {/* Add question here if need more */}
            <input type="submit" value="APPLY" />
          </div>
        </form>
      </Appearance>
    </Section>
  );
};

export default ApplyForm;
