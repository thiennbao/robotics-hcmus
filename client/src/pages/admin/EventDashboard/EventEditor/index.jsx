import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { eventAPI } from "api";
import { createEvent, editEvent } from "../eventSlice";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import { v4 } from "uuid";
import style from "./EventEditor.module.scss";
import Button from "components/Button";

const EventEditor = ({ id, setId }) => {
  const [fileChange, setFileChange] = useState({
    current: [],
    add: [],
    delete: [],
  });

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

  useEffect(() => {
    if (id) {
      eventAPI
        .getEvent(id)
        .then((res) => {
          setValue("title", res.data.title);
          setValue("start", res.data.start.split("T")[0]);
          setValue("end", res.data.end.split("T")[0]);
          setValue("content", res.data.content);
          setValue("images", res.data.images);
          setFileChange((fileChange) => ({ ...fileChange, current: res.data.images }));
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

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

  const handleUploadImage = (images) => {
    const list = getValues("images") || [];
    for (let image of images) {
      const imageRef = ref(storage, `images/courses/${v4()}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          list.push(downloadURL);
          setValue("images", list);
          setFileChange((fileChange) => ({ ...fileChange, add: [...fileChange.add, downloadURL] }));
        });
    }
  };
  const handleRemoveImage = (deleteURL) => {
    if (fileChange.current.includes(deleteURL)) {
      setFileChange({ ...fileChange, delete: [...fileChange.delete, deleteURL] });
    } else {
      const currentRef = ref(storage, deleteURL);
      deleteObject(currentRef);
    }
    setValue(
      "images",
      getValues("images").filter((image) => image !== deleteURL)
    );
  };

  return (
    <div className={style.editor}>
      {!id || watch("title") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("title") : "Add event"}</h3>
          <div>
            <label>Title</label>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
              aria-invalid={!!errors.title}
              onFocus={() => clearErrors("title")}
            />
          </div>
          <div>
            <label>Start date</label>
            <input
              type="date"
              {...register("start", { required: true, valueAsDate: true })}
              aria-invalid={!!errors.start}
              onFocus={() => clearErrors("start")}
            />
          </div>
          <div>
            <label>End date</label>
            <input
              type="date"
              {...register("end", { required: true })}
              aria-invalid={!!errors.end}
              onFocus={() => clearErrors("end")}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              placeholder="Content"
              {...register("content", { required: true })}
              aria-invalid={!!errors.content}
              onFocus={() => clearErrors("content")}
            />
            <div className={style.preview}>
              <input type="checkbox" id="contentToggle" />
              <iframe
                title="content"
                srcDoc={"<style>body{overflow: hidden; margin:0;}</style>" + watch("content")}
              ></iframe>
              <label htmlFor="contentToggle" className={style.overlay}></label>
              <Button variant="outline" type="button">
                <label htmlFor="contentToggle">Preview</label>
              </Button>
            </div>
          </div>
          <div>
            <label>Images</label>
            <input hidden {...register("images")} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUploadImage(e.target.files)}
            />
            {watch("images") && watch("images")[0] && (
              <div className="mt-2 container-fluid">
                <div className="row">
                  {watch("images").map((img, index) => (
                    <div key={index} className="p-0 col-6 position-relative overflow-hidden">
                      <img className={style.image} src={img} alt="Preview" />
                      <div className="position-absolute top-0 end-0 p-1 d-flex">
                        <Button
                          color="green"
                          type="button"
                          onClick={() => navigator.clipboard.writeText(img)}
                        >
                          Get URL
                        </Button>
                        <Button color="red" type="button" onClick={() => handleRemoveImage(img)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={style.buttons}>
            <Button variant="outline" color="green" type="submit">
              SAVE
            </Button>
            <Button variant="outline" color="red" type="button" onClick={handleCancel}>
              CANCEL
            </Button>
          </div>
        </form>
      ) : (
        <h3>
          <span>Loading</span>
          <span className="spinner-border mx-3" role="status"></span>
        </h3>
      )}
    </div>
  );
};

export default EventEditor;
