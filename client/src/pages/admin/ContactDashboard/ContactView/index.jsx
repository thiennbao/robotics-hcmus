import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { contactAPI } from "api";
import { setStatusContact } from "../contactSlice";
import Editor, { TypingFeild } from "components/Editor";

const ContactView = ({ id, setId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({ shouldFocusError: false });

  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    contactAPI
      .getContact(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Form handler
  const handleSave = (data) => {
    dispatch(setStatusContact({ id, status: !data.status }));
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
      <TypingFeild label="Subject" readOnly register={register("subject")} />
      <TypingFeild label="Name" readOnly register={register("name")} />
      <TypingFeild label="Phone" readOnly register={register("phone")} />
      <TypingFeild label="Email" readOnly register={register("email")} />
      <TypingFeild label="Message" readOnly textarea register={register("message")} />
    </Editor>
  );
};

export default ContactView;
