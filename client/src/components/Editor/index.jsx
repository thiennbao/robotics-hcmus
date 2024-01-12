import { FormProvider, useForm, useFormContext } from "react-hook-form";
import style from "./Editor.module.scss";
import Button from "components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "config/firebase";
import Loading from "components/Loading";

const InputField = ({ name, options }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <input
      {...register(name, options)}
      aria-invalid={!!errors[name]}
      onFocus={() => clearErrors(name)}
    />
  );
};

const TextField = ({ name, options }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <textarea
      className={style.textField}
      {...register(name, options)}
      aria-invalid={!!errors[name]}
      onFocus={() => clearErrors(name)}
    />
  );
};

const ImageField = ({ name, options }) => {
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
    <>
      <input hidden {...register(name, options)} />
      <input
        type="file"
        accept="image/*"
        onInput={handleUpload}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
      />
      {watch(name) && <img src={watch(name)} alt="" className={style.preview} />}
    </>
  );
};

const MultiImageField = ({ name, options }) => {
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
        setValue(name, [url, ...getValues(name)]);
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

  // Clear URL object when leaving changing to avoid memory leak
  useEffect(() => {
    return () => {
      if (getValues(name)) {
        getValues(name).map((url) => URL.revokeObjectURL(url));
      }
    };
  }, [name, getValues]);

  return (
    <>
      <input hidden {...register(name, options)} />
      <input
        type="file"
        accept="image/*"
        multiple
        onInput={handleUpload}
        aria-invalid={!!errors[name]}
        onFocus={() => clearErrors(name)}
      />
      {watch(name) && (
        <div className="mt-2 container-fluid">
          <div className="row">
            {watch(name).map((image) => (
              <div key={image} className="p-0 col-6 position-relative overflow-hidden">
                <img src={image} alt="" className={style.multiPreview} />
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
    </>
  );
};

const Editor = ({ initData, save, cancel, fields }) => {
  const methods = useForm({ shouldFocusError: false });

  const [urls, setUrls] = useState([]);

  // Fill initial data
  useEffect(() => {
    if (initData) {
      for (let field of fields) {
        methods.setValue(field.name, initData[field.name]);
        // Mark initial urls in a list
        if (field.type === ImageField) {
          const url = initData[field.name];
          if (url && !urls.includes(url)) {
            setUrls((urls) => [url, ...urls]);
          }
        } else if (field.type === MultiImageField) {
          if (initData[field.name]) {
            for (let url of initData[field.name]) {
              if (url && !urls.includes(url)) {
                setUrls((urls) => [url, ...urls]);
              }
            }
          }
        }
      }
    }
  }, [initData, fields, methods, urls]);

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
      if (field.type === ImageField) {
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
      } else if (field.type === MultiImageField) {
        // Upload multi image fields
        for (let url of data[field.name]) {
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

  return (
    <div className={style.editor}>
      {initData && !Object.keys(initData).length ? (
        <>
          <div className="d-flex justify-content-center my-5">
            <Loading />
          </div>
          <div className={style.buttons}>
            <Button variant="outline" color="red" type="button" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(async (data) => {
              await handleUpload(data);
              save(data);
            })}
          >
            <h3>Editor</h3>
            {fields.map((field, index) => (
              <div key={index}>
                <label>{field.name[0].toUpperCase() + field.name.slice(1)}</label>
                <field.type name={field.name} options={field.options} />
              </div>
            ))}
            <div className={style.buttons}>
              <Button variant="outline" color="green">
                Save
              </Button>
              <Button variant="outline" color="red" type="button" onClick={cancel}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export { InputField, TextField, ImageField, MultiImageField };
export default Editor;
