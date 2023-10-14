import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { eventAPI } from "api";
import { createEvent, editEvent } from "../eventSlice";
import style from "./EventEditor.module.scss";
import Button from "components/Button";

const EventEditor = ({ id, setId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
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
          setValue("banner", res.data.banner);
          setValue("content", res.data.content);
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  const handleSave = (data) => {
    data.start = new Date(data.start).toISOString();
    data.end = new Date(data.end).toISOString();
    if (id) {
      dispatch(editEvent({ id, data }));
    } else {
      dispatch(createEvent(data));
    }
    setId();
  };

  return (
    <div className={style.editor}>
      {!id || watch("title") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("title") : "Add event"}</h3>
          <div className={style.inputWrapper}>
            <label>Title</label>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
              aria-invalid={!!errors.title}
              onFocus={() => clearErrors("title")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Start date</label>
            <input
              type="date"
              {...register("start", { required: true, valueAsDate: true })}
              aria-invalid={!!errors.start}
              onFocus={() => clearErrors("start")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>End date</label>
            <input
              type="date"
              {...register("end", { required: true })}
              aria-invalid={!!errors.end}
              onFocus={() => clearErrors("end")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Banner</label>
            <textarea
              placeholder="Banner"
              {...register("banner", { required: true })}
              aria-invalid={!!errors.banner}
              onFocus={() => clearErrors("banner")}
            />
            <div className={style.preview}>
              <input type="checkbox" id="bannerToggle" />
              <div className={style.bannerPreview} dangerouslySetInnerHTML={{ __html: watch("banner") }}></div>
              <label htmlFor="bannerToggle" className={style.overlay}></label>
              <Button variant="outline">
                <label htmlFor="bannerToggle">Preview</label>
              </Button>
            </div>
          </div>
          <div className={style.inputWrapper}>
            <label>Content</label>
            <textarea
              placeholder="Content"
              {...register("content", { required: true })}
              aria-invalid={!!errors.content}
              onFocus={() => clearErrors("content")}
            />
            <div className={style.preview}>
              <input type="checkbox" id="contentToggle" />
              <div className={style.contentPreview} dangerouslySetInnerHTML={{ __html: watch("content") }}></div>
              <label htmlFor="contentToggle" className={style.overlay}></label>
              <Button variant="outline">
                <label htmlFor="contentToggle">Preview</label>
              </Button>
            </div>
          </div>
          <div className={style.buttons}>
            <input type="submit" value="SAVE" />
            <Button variant="outline" onClick={() => setId()}>
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
