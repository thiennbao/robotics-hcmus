import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { applicationAPI } from "api";
import { setStatusApplication } from "../applicationSlice";
import Editor, { TypingFeild } from "components/Editor";

const ApplicationView = ({ id, setId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({ shouldFocusError: false });

  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    applicationAPI
      .getApplication(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Form handler
  const handleSave = (data) => {
    dispatch(setStatusApplication({ id, status: !data.status }));
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
    <TypingFeild label="Name" readOnly register={register("name")} />
    <TypingFeild label="Phone" readOnly register={register("phone")} />
    <TypingFeild label="Email" readOnly register={register("email")} />
    <TypingFeild label="Address" readOnly register={register("address")} />
    <TypingFeild label="Question 1" readOnly register={register("qn1")} />
    <TypingFeild label="Question 2" readOnly register={register("qn2")} />
    <TypingFeild label="Question 3" readOnly textarea register={register("qn3")} />
  </Editor>
  );
};

export default ApplicationView;
