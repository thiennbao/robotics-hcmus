import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { eventAPI } from "api";
import { createEvent, editEvent } from "../eventSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import Editor, { HtmlField, MultipleImageField, TypingFeild } from "components/Editor";

const EventEditor = ({ id, setId }) => {
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

  const [fileChange, setFileChange] = useState({
    current: [],
    add: [],
    delete: [],
  });
  const [data, setData] = useState(id ? {} : null);

  // Get initial data
  useEffect(() => {
    if (id) {
      eventAPI
        .getEvent(id)
        .then((res) => {
          res.data.start = res.data.start.split("T")[0];
          res.data.end = res.data.end.split("T")[0];
          setData(res.data);
          setFileChange((fileChange) => ({ ...fileChange, current: res.data.images }));
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  // Form handler
  const handleSave = (data) => {
    data.start = new Date(data.start).toISOString();
    data.end = new Date(data.end).toISOString();
    for (let file of fileChange.delete) {
      const currentRef = ref(storage, file);
      deleteObject(currentRef);
    }
    if (id) {
      dispatch(editEvent({ id, data }));
    } else {
      dispatch(createEvent(data));
    }
    setId();
  };
  const handleCancel = () => {
    for (let file of fileChange.add) {
      const currentRef = ref(storage, file);
      deleteObject(currentRef);
    }
    setId();
  };

  return (
    <Editor
      initial={data}
      valueHandler={setValue}
      formHandler={[handleSubmit, handleSave, handleCancel]}
    >
      <TypingFeild
        label="Title"
        placeholder="Title"
        register={register("title", { required: true })}
        aria-invalid={!!errors.title}
        onFocus={() => clearErrors("title")}
        test={getValues("title")}
      />
      <TypingFeild
        label="Start date"
        type="date"
        register={register("start", { required: true })}
        aria-invalid={!!errors.start}
        onFocus={() => clearErrors("start")}
        test={getValues("start")}
      />
      <TypingFeild
        label="End date"
        type="date"
        register={register("end", { required: true })}
        aria-invalid={!!errors.end}
        onFocus={() => clearErrors("end")}
        test={getValues("end")}
      />
      <MultipleImageField
        label="Images"
        images={watch("images")}
        register={register("images")}
        onFocus={() => clearErrors("images")}
        fileHandler={[fileChange, setFileChange]}
        valueHandler={[getValues, setValue]}
      />
      <HtmlField
        label="Content"
        content={watch("content")}
        register={register("content", { required: true })}
        aria-invalid={!!errors.content}
        onFocus={() => clearErrors("content")}
        test={getValues("content")}
      />
    </Editor>
  );
};

export default EventEditor;
