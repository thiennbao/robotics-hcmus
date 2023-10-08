import { useEffect } from "react";
import { newsAPI } from "api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNews, editNews } from "../newsSlice";
import Button from "components/Button";
import style from "./NewsEditor.module.scss";

const NewsEditor = ({ id, setId }) => {
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
      newsAPI
        .getOneNews(id)
        .then((res) => {
          setValue("title", res.data.title);
          setValue("thumbnail", res.data.thumbnail);
          setValue("content", res.data.content);
          setValue("images", res.data.images);
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  const handleSave = (data) => {
    if (id) {
      dispatch(editNews({ id, data }));
    } else {
      dispatch(createNews(data));
    }
    setId();
  };

  const handleUploadThumbnail = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("thumbnail", reader.result.toString());
      };
    }
  };
  const handleUploadImages = (files) => {
    if (files) {
      const images = [];
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onloadend = () => {
          images.push(reader.result);
          setValue("images", images);
        };
      }
    }
  };

  return (
    <div className={style.editor}>
      {!id || watch("title") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("title") : "Add news"}</h3>
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
            <label>Thumbnail</label>
            <input hidden {...register("thumbnail", { required: true })} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadThumbnail(e.target.files[0])}
              aria-invalid={!!errors.thumbnail}
              onFocus={() => clearErrors("thumbnail")}
            />
            {watch("thumbnail") && (
              <div className={style.thumbnail}>
                <img src={watch("thumbnail")} alt="Preview" />
              </div>
            )}
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
              <div
                className={style.contentPreview}
                dangerouslySetInnerHTML={{ __html: watch("content") }}
              ></div>
              <label htmlFor="contentToggle" className={style.overlay}></label>
              <Button type="outline">
                <label htmlFor="contentToggle">Preview</label>
              </Button>
            </div>
          </div>
          <div className={style.inputWrapper}>
            <label>Images</label>
            <input hidden {...register("images")} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUploadImages(e.target.files)}
            />
            {watch("images") && watch("images")[0] && (
              <div className={style.images}>
                <div className="row g-1">
                  {watch("images").map((img, index) => (
                    <div key={index} className="col-6">
                      <img src={img} alt="Preview" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={style.buttons}>
            <input type="submit" value="SAVE" />
            <Button type="outline" onClick={() => setId()}>
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

export default NewsEditor;
