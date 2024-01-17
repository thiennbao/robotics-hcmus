import { FormProvider, useForm, useFormContext } from "react-hook-form";
import style from "./Editor.module.scss";
import Button from "components/Button";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "config/firebase";
import Loading from "components/Loading";
import { useLocation, useParams } from "react-router-dom";

const FilesContext = createContext();

const InputField = ({ name, options, ...rest }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{name}</label>
      <input
        {...register(name, options)}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
      {errors[name] && errors[name].type === "min" && <span>Please enter a larger number</span>}
    </div>
  );
};

const TextField = ({ name, options, ...rest }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style.textField}>
      <label>{name}</label>
      <textarea
        {...register(name, options)}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
    </div>
  );
};

const ImageField = ({ name, options, ...rest }) => {
  const [files, setFiles] = useContext(FilesContext);

  const {
    register,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const newFiles = { ...files };
    if (file) {
      if (getValues(name)) {
        newFiles.deleted = [...files.deleted, getValues(name)];
      }
      const uploadRef = ref(storage, `images/${v4()}`);
      const snapshot = await uploadBytes(uploadRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      newFiles.uploaded.push(downloadURL);
      setFiles(newFiles);
      setValue(name, downloadURL);
    }
  };

  return (
    <div className={style.imageField}>
      <label>{name}</label>
      <input hidden {...register(name, options)} />
      <input
        type="file"
        accept="image/*"
        onInput={handleUpload}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
      {watch(name) && <img src={watch(name)} alt="" className={style.preview} />}
    </div>
  );
};

const MultiImageField = ({ name, options, ...rest }) => {
  const [files, setFiles] = useContext(FilesContext);

  const {
    register,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleUpload = async (e) => {
    const { length, ...uploadFiles } = e.target.files;
    const urls = [];
    const newFiles = { ...files };
    for (let index in uploadFiles) {
      const uploadRef = ref(storage, `images/${v4()}`);
      const snapshot = await uploadBytes(uploadRef, uploadFiles[index]);
      const downloadURL = await getDownloadURL(snapshot.ref);
      urls.push(downloadURL);
      newFiles.uploaded.push(downloadURL);
    }
    setFiles(newFiles);
    setValue(name, [...(getValues(name) || []), ...urls]);
  };
  const handleRemove = (deletedURL) => {
    const newFiles = { ...files };
    newFiles.deleted.push(deletedURL);
    setValue(
      name,
      getValues(name).filter((url) => url !== deletedURL)
    );
  };
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={style.multiImageField}>
      <label>{name}</label>
      <input hidden {...register(name, options)} />
      <input
        type="file"
        accept="image/*"
        multiple
        onInput={handleUpload}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
      {watch(name) && (
        <div className="mt-2 container-fluid">
          <div className="row">
            {watch(name).map((image) => (
              <div key={image} className="p-0 col-6 position-relative overflow-hidden">
                <img src={image} alt="" className={style.multiPreview} />
                <div className="position-absolute top-0 end-0 d-flex p-0">
                  <Button
                    color="green"
                    type="button"
                    className="p-1"
                    onClick={() => handleCopy(image)}
                  >
                    Copy
                  </Button>
                  <Button
                    color="red"
                    type="button"
                    className="p-1"
                    onClick={() => handleRemove(image)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HtmlField = ({ name, options, ...rest }) => {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style.htmlField}>
      <label>{name}</label>
      <textarea
        {...register(name, options)}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
      <div>
        <input type="checkbox" id="contentToggle" />
        <div className={style.preview} dangerouslySetInnerHTML={{ __html: watch(name) }}></div>
        <label htmlFor="contentToggle" className={style.overlay}></label>
        <Button variant="outline" type="button">
          <label htmlFor="contentToggle">Preview</label>
        </Button>
      </div>
    </div>
  );
};

const PasswordField = ({ name, options, confirm, ...rest }) => {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const validate = (value) => {
    if (watch(name) !== value) {
      return "Confirm password does not match";
    }
  };

  return (
    <div>
      <label>{name}</label>
      <input
        type="password"
        {...register(name, options)}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        {...rest}
      />
      {errors[name] && errors[name].type === "minLength" && <span>Password is too week</span>}
      {errors[name] && errors[name].type === "maxLength" && <span>Password is too long</span>}
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
      {confirm && (
        <>
          <label>Confirm {name}</label>
          <input
            type="password"
            {...register(`confirm ${name}`, { validate })}
            aria-invalid={!!errors[`confirm ${name}`]}
            onFocus={() => clearErrors(`confirm ${name}`)}
            {...rest}
          />
          {errors[`confirm ${name}`] && <span>{errors[`confirm ${name}`].message}</span>}
        </>
      )}
    </div>
  );
};

const SelectField = ({ name, options, select, ...rest }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{name}</label>
      <select
        {...register(name, options)}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
        defaultValue=""
        {...rest}
      >
        <option value="" disabled hidden></option>
        {select.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      {errors[name] && errors[name].type === "required" && <span>Please fill out this field</span>}
    </div>
  );
};

const Editor = ({ fields, data, handleSave }) => {
  const [files, setFiles] = useState({ uploaded: [], deleted: [] });

  const methods = useForm({ shouldFocusError: false });

  // Fill initial data
  useEffect(() => {
    if (data) {
      for (let field of fields) {
        methods.setValue(field.name, data[field.name]);
      }
    }
  }, [fields, data, methods]);

  const clearUploadedFiles = () => {
    files.uploaded.forEach((deletedURL) => {
      deleteObject(ref(storage, deletedURL));
    });
  };
  const clearDeletedFiles = () => {
    files.deleted.forEach((deletedURL) => {
      deleteObject(ref(storage, deletedURL));
    });
  };

  const path = useLocation().pathname.replace(useParams().id, "");

  return (
    <FilesContext.Provider value={[files, setFiles]}>
      <div className={style.editor}>
        {!data ? (
          <div>
            <div className="d-flex justify-content-center my-5">
              <Loading />
            </div>
            <div className={style.buttons}>
              <Button variant="outline" color="red" type="button" to={path}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) => {
                clearDeletedFiles();
                handleSave(data);
              })}
            >
              <h3>Editor</h3>
              {fields.map((field, index) => {
                const { variant, name, options, ...rest } = field;
                return (
                  field.variant && (
                    <field.variant key={index} name={name} options={options} {...rest} />
                  )
                );
              })}
              <div className={style.buttons}>
                <Button variant="outline" color="green">
                  Save
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  type="button"
                  onClick={() => clearUploadedFiles()}
                  to={path}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </FilesContext.Provider>
  );
};

export {
  InputField,
  TextField,
  ImageField,
  MultiImageField,
  HtmlField,
  PasswordField,
  SelectField,
};
export default Editor;
