import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { timelineAPI } from "api";
import { createTimeline, editTimeline } from "../timelineSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import Editor, { MultipleImageField, TypingFeild } from "components/Editor";

const TimelineEditor = ({ id, setId }) => {
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
      timelineAPI
        .getTimeline(id)
        .then((res) => {
          res.data.date = res.data.date.split("T")[0];
          setData(res.data);
          setFileChange((fileChange) => ({ ...fileChange, current: res.data.images }));
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  // Form handler
  const handleSave = (data) => {
    for (let file of fileChange.delete) {
      const currentRef = ref(storage, file);
      deleteObject(currentRef);
    }
    if (id) {
      dispatch(editTimeline({ id, data }));
    } else {
      dispatch(createTimeline(data));
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
      />
      <TypingFeild
        textarea
        label="Content"
        placeholder="Content"
        register={register("content", { required: true })}
        aria-invalid={!!errors.content}
        onFocus={() => clearErrors("content")}
      />
      <TypingFeild
        label="Date"
        type="date"
        register={register("date", { required: true })}
        aria-invalid={!!errors.date}
        onFocus={() => clearErrors("date")}
      />
      <MultipleImageField
        label="Images"
        images={watch("images")}
        register={register("images")}
        onFocus={() => clearErrors("images")}
        fileHandler={[fileChange, setFileChange]}
        valueHandler={[getValues, setValue]}
      />
    </Editor>
  );
};

export default TimelineEditor;
