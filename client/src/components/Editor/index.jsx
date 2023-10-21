import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "config/firebase";
import { v4 } from "uuid";
import style from "./Editor.module.scss";
import Button from "components/Button";

const TypingFeild = (props) => {
  const { register, textarea, label, ...rest } = props;

  return (
    <div className={style.typingFeild}>
      <label>{label}</label>
      {textarea ? <textarea {...register} {...rest} /> : <input {...register} {...rest} />}
    </div>
  );
};

const ImageField = (props) => {
  const { register, label, image, valueHandler, ...rest } = props;

  const [getValues, setValue] = valueHandler;

  const handleUpload = (image) => {
    if (image) {
      if (getValues(register.name)) {
        const currentRef = ref(storage, getValues(register.name));
        deleteObject(currentRef);
      }
      const uploadRef = ref(storage, `images/${v4()}`);
      uploadBytes(uploadRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          setValue(register.name, downloadURL);
        });
    }
  };

  return (
    <div className={style.imageField}>
      <label>{label}</label>
      <input hidden {...register} />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files[0])}
        {...rest}
      />
      {image && (
        <div className="mt-2">
          <img src={image} alt="Preview" />
        </div>
      )}
    </div>
  );
};

const MultipleImageField = (props) => {
  const { register, label, images, valueHandler, fileHandler, ...rest } = props;

  const [getValues, setValue] = valueHandler;
  const [fileChange, setFileChange] = fileHandler;

  const handleUpload = (images) => {
    const list = getValues(register.name) || [];
    for (let image of images) {
      const uploadRef = ref(storage, `images/${v4()}`);
      uploadBytes(uploadRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          list.push(downloadURL);
          setValue(register.name, list);
          setFileChange((fileChange) => ({ ...fileChange, add: [...fileChange.add, downloadURL] }));
        });
    }
  };

  const handleRemove = (deleteURL) => {
    if (fileChange.current.includes(deleteURL)) {
      setFileChange({ ...fileChange, delete: [...fileChange.delete, deleteURL] });
    } else {
      const currentRef = ref(storage, deleteURL);
      deleteObject(currentRef);
    }
    setValue(
      register.name,
      getValues(register.name).filter((image) => image !== deleteURL)
    );
  };

  return (
    <div className={style.multipleImageField}>
      <input hidden {...register} />
      <label>{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleUpload(e.target.files)}
        {...rest}
      />
      {images && images[0] && (
        <div className="mt-2 container-fluid">
          <div className="row">
            {images.map((image, index) => (
              <div key={index} className="p-0 col-6 position-relative overflow-hidden">
                <img src={image} alt="Preview" />
                <Button
                  color="red"
                  type="button"
                  className="position-absolute top-0 end-0 p-1"
                  onClick={() => handleRemove(image)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HtmlField = (props) => {
  const { register, label, content, ...rest } = props;

  return (
    <div className={style.htmlField}>
      <label>{label}</label>
      <textarea {...register} {...rest} />
      <div>
        <input type="checkbox" id="contentToggle" />
        <iframe
          title="content"
          srcDoc={"<style>body{overflow: hidden; margin:0;}</style>" + content}
        ></iframe>
        <label htmlFor="contentToggle" className={style.overlay}></label>
        <Button variant="outline" type="button">
          <label htmlFor="contentToggle">Preview</label>
        </Button>
      </div>
    </div>
  );
};

const Editor = ({ initial, valueHandler, formHandler, children }) => {
  const [handleSubmit, handleSave, handleCancel] = formHandler;

  useEffect(() => {
    if (initial) {
      for (let field in initial) {
        valueHandler(field, initial[field]);
      }
    }
  }, [initial, valueHandler]);

  return (
    <div className={style.editor}>
      {initial && !Object.keys(initial).length ? (
        <h3>
          <span>Loading</span>
          <span className="spinner-border mx-3" role="status"></span>
        </h3>
      ) : (
        <form onSubmit={handleSubmit(handleSave)}>
          {children}
          <div className={style.buttons}>
            <Button variant="outline" color="green" type="submit">
              SAVE
            </Button>
            <Button variant="outline" color="red" type="button" onClick={handleCancel}>
              CANCEL
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export { TypingFeild, ImageField, MultipleImageField, HtmlField };
export default Editor;
