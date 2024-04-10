import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../contactSlice";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";
import { resourceApi } from "api";
import Button from "components/Button";

const ContactList = () => {
  const dispatch = useDispatch();

  const rawContacts = useSelector((state) => state.contact);
  const contacts = rawContacts.map((rawContact) => ({
    date: rawContact.createdAt.split("T")[0],
    ...rawContact,
  }));

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(getContacts({ skip: 0, limit: 5 }));
    }
  }, [contacts, dispatch]);

  const loadHandle = () => {
    dispatch(getContacts({ skip: contacts.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this contact")) {
      dispatch(deleteContact({ id }));
    }
  };

  // Backup data
  const [downloadUrl, setDownloadUrl] = useState();
  useEffect(() => {
    resourceApi
      .getResources({ resource: "contact" })
      .then((res) => {
        const { data } = res;
        const bytes = new TextEncoder().encode(JSON.stringify(data));
        const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleImport = (e) => {
    // Read uploaded file
    const file = e.target.files[0];
    const readFile = (file, callback) => {
      const reader = new FileReader();
      reader.onload = () => callback(reader.result);
      reader.readAsText(file);
    };
    readFile(file, (res) => {
      // Call api
      const data = JSON.parse(res);
      data.forEach((item) => {
        resourceApi
          .postResource({ resource: "contact", data: item })
          .then(() => dispatch(getContacts({ skip: 0, limit: 5 })))
          .catch((error) => console.log(error));
      });
    });
  };

  return (
    <AdminLayout page="CONTACT">
      <DataTable
        fields={["subject", "name", "date"]}
        data={contacts}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={true}
      />
      <div className="d-flex justify-content-center my-5">
        <Button variant="outline" onClick={loadHandle} className="px-4 py-2 mx-2">
          Load more
        </Button>
        <Button variant="outline" color="green" className="mx-2">
          <a href={downloadUrl} download="contact.json" className="px-4 py-2" style={{ color: "inherit" }}>
            Download data
          </a>
        </Button>
        <Button variant="outline" color="red" className="mx-2">
          <label htmlFor="import" className="px-4 py-2">
            Import data
          </label>
          <input type="file" id="import" className="d-none" onInput={handleImport} />
        </Button>
      </div>
    </AdminLayout>
  );
};

export default ContactList;
