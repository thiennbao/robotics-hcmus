import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { memberAPI } from "api";
import { createMember, editMember } from "../memberSlice";
import Editor, { ImageField, TypingFeild } from "components/Editor";

const MemberEditor = ({ id, setId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id) {
      memberAPI
        .getMember(id)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  // Form handler
  const handleSave = (data) => {
    if (id) {
      dispatch(editMember({ id, data }));
    } else {
      dispatch(createMember(data));
    }
    setId();
  };
  const handleCancel = () => {
    setId();
  };

  return (
    <Editor
      initial={data}
      valueHandler={setValue}
      formHandler={[handleSubmit, handleSave, handleCancel]}
    >
      <TypingFeild
        label="Name"
        placeholder="Name"
        register={register("name", { required: true })}
        aria-invalid={!!errors.name}
        onFocus={() => clearErrors("name")}
      />
      <ImageField
        label="Image"
        image={watch("image")}
        register={register("image", { required: true })}
        aria-invalid={!!errors.image}
        onFocus={() => clearErrors("image")}
        valueHandler={[getValues, setValue]}
      />
      <TypingFeild
        label="Position"
        placeholder="Position"
        register={register("position", { required: true })}
        aria-invalid={!!errors.position}
        onFocus={() => clearErrors("position")}
      />
      <TypingFeild
        textarea
        label="Quote"
        placeholder="Quote"
        register={register("quote", { required: true })}
        aria-invalid={!!errors.quote}
        onFocus={() => clearErrors("quote")}
      />
      <div className="d-flex">
        <TypingFeild
          label="Facebook"
          placeholder="Facebook"
          register={register("facebook")}
          aria-invalid={!!errors.facebook}
          onFocus={() => clearErrors("facebook")}
        />
        <TypingFeild
          label="Instagram"
          placeholder="Instagram"
          register={register("instagram")}
          aria-invalid={!!errors.instagram}
          onFocus={() => clearErrors("instagram")}
        />
        <TypingFeild
          label="LinkedIn"
          placeholder="LinkedIn"
          register={register("linkedin")}
          aria-invalid={!!errors.linkedin}
          onFocus={() => clearErrors("linkedin")}
        />
      </div>
    </Editor>
  );
};

export default MemberEditor;
