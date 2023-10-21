import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { courseAPI } from "api";
import { createCourse, editCourse } from "../courseSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import Editor, { ImageField, MultipleImageField, TypingFeild } from "components/Editor";

const CourseEditor = ({ id, setId }) => {
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
      courseAPI
        .getCourse(id)
        .then((res) => {
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
      dispatch(editCourse({ id, data }));
    } else {
      dispatch(createCourse(data));
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
        label="Name"
        placeholder="Name"
        register={register("name", { required: true })}
        aria-invalid={!!errors.name}
        onFocus={() => clearErrors("name")}
      />
      <ImageField
        label="Thumbnail"
        image={watch("thumbnail")}
        register={register("thumbnail", { required: true })}
        aria-invalid={!!errors.thumbnail}
        onFocus={() => clearErrors("thumbnail")}
        valueHandler={[getValues, setValue]}
      />
      <TypingFeild
        type="number"
        label="Tuition"
        placeholder="Tuition"
        register={register("tuition", { required: true })}
        aria-invalid={!!errors.tuition}
        onFocus={() => clearErrors("tuition")}
      />
      <TypingFeild
        textarea
        label="Description"
        placeholder="Description"
        register={register("description", { required: true })}
        aria-invalid={!!errors.description}
        onFocus={() => clearErrors("description")}
      />
      <div className="d-flex">
        <TypingFeild
          label="Age"
          placeholder="Age"
          register={register("age", { required: true })}
          aria-invalid={!!errors.age}
          onFocus={() => clearErrors("age")}
        />
        <TypingFeild
          type="number"
          label="Lesson"
          placeholder="Lesson"
          register={register("lesson", { required: true })}
          aria-invalid={!!errors.lesson}
          onFocus={() => clearErrors("lesson")}
        />
        <TypingFeild
          type="number"
          label="Time"
          placeholder="Time"
          register={register("time", { required: true })}
          aria-invalid={!!errors.time}
          onFocus={() => clearErrors("time")}
        />
      </div>
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

export default CourseEditor;
