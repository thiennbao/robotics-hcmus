import { FormProvider, useForm, useFormContext } from "react-hook-form";
import style from "./Editor.module.scss";
import Button from "components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "config/firebase";
import Loading from "components/Loading";
import { useLocation, useParams } from "react-router-dom";

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
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setValue(name, url);
    }
  };

  // Clear URL object when changing input to avoid memory leak
  const url = watch(name);
  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

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
  const {
    register,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleUpload = (e) => {
    const { length, ...files } = e.target.files;
    if (files) {
      for (let index in files) {
        const url = URL.createObjectURL(files[index]);
        setValue(name, [url, ...(getValues(name) || [])]);
      }
    }
  };

  const handleRemove = (deletedURL) => {
    URL.revokeObjectURL(deletedURL);
    setValue(
      name,
      getValues(name).filter((url) => url !== deletedURL)
    );
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  // Clear URL object when leaving changing to avoid memory leak
  useEffect(() => {
    return () => {
      if (getValues(name)) {
        getValues(name).map((url) => URL.revokeObjectURL(url));
      }
    };
  }, [name, getValues]);

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
        <iframe title="content" srcDoc={watch(name)}></iframe>
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
  const methods = useForm({ shouldFocusError: false });

  const [urls, setUrls] = useState([]);

  // Fill initial data
  useEffect(() => {
    if (data) {
      for (let field of fields) {
        methods.setValue(field.name, data[field.name]);
        // Mark initial urls in a list
        if (field.variant === ImageField) {
          const url = data[field.name];
          if (url && !urls.includes(url)) {
            setUrls((urls) => [url, ...urls]);
          }
        } else if (field.variant === MultiImageField) {
          if (data[field.name]) {
            for (let url of data[field.name]) {
              if (url && !urls.includes(url)) {
                setUrls((urls) => [url, ...urls]);
              }
            }
          }
        }
      }
    }
  }, [fields, data, methods, urls]);

  // Handle uploading to firebase
  const handleUpload = async (data) => {
    // Upload function
    const upload = async (url) => {
      try {
        // Fetch to blob URL
        const res = await axios.get(url, { responseType: "blob" });
        // Create file from URL
        const file = new File([res.data], ".png", {
          type: "image/png",
        });
        // Upload file and return uploaded URL
        const uploadRef = ref(storage, `images/${v4()}`);
        const snapshot = await uploadBytes(uploadRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      } catch (error) {
        console.log(error);
      }
    };

    // Loop through fields and upload files
    const newUrls = [];
    for (let field of fields) {
      if (field.variant === ImageField) {
        // Upload image fields
        const url = data[field.name];
        newUrls.push(url);
        // Check if file not exist in firebase
        if (!urls.includes(url)) {
          // Upload new file
          const downloadURL = await upload(url);
          // Replace blob URL with uploaded URL
          data[field.name] = downloadURL;
        }
      } else if (field.variant === MultiImageField) {
        // Upload multi image fields
        for (let url of data[field.name] || []) {
          newUrls.push(url);
          // Check if file not exist in firebase
          if (!urls.includes(url)) {
            // Upload new file
            const downloadURL = await upload(url);
            // Replace blob URL with uploaded URL
            data[field.name][data[field.name].indexOf(url)] = downloadURL;
          }
        }
      }
    }

    // Delete files from firebase
    for (let url of urls) {
      // Check if URL has been deleted
      if (!newUrls.includes(url)) {
        // Deleted it from firebase
        const currentRef = ref(storage, url);
        deleteObject(currentRef);
      }
    }
  };

  const path = useLocation().pathname.replace(useParams().id, "");

  return (
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
            onSubmit={methods.handleSubmit(async (data) => {
              await handleUpload(data);
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
              <Button variant="outline" color="red" type="button" to={path}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
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
