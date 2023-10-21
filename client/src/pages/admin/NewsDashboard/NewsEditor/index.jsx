import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { newsAPI } from "api";
import { createNews, editNews } from "../newsSlice";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import Editor, { HtmlField, ImageField, MultipleImageField, TypingFeild } from "components/Editor";

const NewsEditor = ({ id, setId }) => {
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
      newsAPI
        .getOneNews(id)
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
      dispatch(editNews({ id, data }));
    } else {
      dispatch(createNews(data));
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
      <ImageField
        label="Thumbnail"
        image={watch("thumbnail")}
        register={register("thumbnail", { required: true })}
        aria-invalid={!!errors.thumbnail}
        onFocus={() => clearErrors("thumbnail")}
        valueHandler={[getValues, setValue]}
      />
      <HtmlField
        label="Content"
        content={watch("content")}
        full
        register={register("content", { required: true })}
        aria-invalid={!!errors.content}
        onFocus={() => clearErrors("content")}
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

export default NewsEditor;
