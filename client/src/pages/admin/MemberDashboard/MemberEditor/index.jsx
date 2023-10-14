import { useEffect, useState } from "react";
import { memberAPI } from "api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createMember, editMember } from "../memberSlice";
import Button from "components/Button";
import style from "./MemberEditor.module.scss";

const MemberEditor = ({ id, setId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ shouldFocusError: false });

  const [links, setLinks] = useState({
    facebook: "",
    instagram: "",
    github: "",
  })

  useEffect(() => {
    if (id) {
      memberAPI
        .getMember(id)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("position", res.data.position);
          setValue("quote", res.data.quote);
          setValue("image", res.data.image);
          setValue("links", res.data.links);
          if (res.data.links) {
            setLinks(JSON.parse(res.data.links))
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id, setValue]);

  const handleSave = (data) => {
    if (id) {
      dispatch(editMember({ id, data }));
    } else {
      dispatch(createMember(data));
    }
    setId();
  };

  const handleUploadImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("image", reader.result.toString());
      };
    }
  };
  const handleAddLinks = (field, link) => {
    const newLinks = {...links};
    newLinks[field] = link;
    setValue("links", JSON.stringify(newLinks))
    setLinks(newLinks)
  };

  return (
    <div className={style.editor}>
      {!id || watch("name") ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <h3>{id ? "Edit " + watch("name") : "Add member"}</h3>
          <div className={style.inputWrapper}>
            <label>Name</label>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
              aria-invalid={!!errors.name}
              onFocus={() => clearErrors("name")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Position</label>
            <input
              placeholder="Position"
              {...register("position", { required: true })}
              aria-invalid={!!errors.position}
              onFocus={() => clearErrors("position")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Quote</label>
            <textarea
              placeholder="Quote"
              {...register("quote", { required: true })}
              aria-invalid={!!errors.quote}
              onFocus={() => clearErrors("quote")}
            />
          </div>
          <div className={style.inputWrapper}>
            <label>Image</label>
            <input hidden {...register("image", { required: true })} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(e.target.files[0])}
              aria-invalid={!!errors.image}
              onFocus={() => clearErrors("image")}
            />
            {watch("image") && (
              <div className={style.image}>
                <img src={watch("image")} alt="Preview" />
              </div>
            )}
          </div>
          <div className={style.inputWrapper}>
            <label>Links</label>
            <input hidden {...register("links")} />
            <input
              placeholder="Facebook"
              onInput={(e) => handleAddLinks("facebook", e.target.value)}
              value={links.facebook}
            />
            <input
              placeholder="Instagram"
              onChange={(e) => handleAddLinks("instagram", e.target.value)}
              value={links.instagram}
            />
            <input
              placeholder="Github"
              onChange={(e) => handleAddLinks("github", e.target.value)}
              value={links.github}
            />
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

export default MemberEditor;
