import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { registrationAPI } from "api";
import { setStatusRegistration } from "../registrationSlice";
import Editor, { TypingFeild } from "components/Editor";

const RegistrationView = ({ id, setId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({ shouldFocusError: false });

  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    registrationAPI
      .getRegistration(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Form handler
  const handleSave = (data) => {
    dispatch(setStatusRegistration({ id, status: !data.status }));
    setId();
  };
  const handleCancel = () => {
    setId();
  };

  return (
    <Editor
      viewStatus={data.status}
      initial={data}
      valueHandler={setValue}
      formHandler={[handleSubmit, handleSave, handleCancel]}
    >
      <TypingFeild label="Course" readOnly register={register("course")} />
      <TypingFeild label="Name" readOnly register={register("name")} />
      <TypingFeild label="Phone" readOnly register={register("phone")} />
      <TypingFeild label="Email" readOnly register={register("email")} />
      <TypingFeild label="Message" readOnly textarea register={register("message")} />
    </Editor>
  );
};

export default RegistrationView;
