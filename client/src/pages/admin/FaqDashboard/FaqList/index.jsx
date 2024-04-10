import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaq, getFaqs } from "../faqSlice";
import { authApi, resourceApi } from "api";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";
import Button from "components/Button";

const FaqList = () => {
  // Verify auth
  const [actionDisable, setActionDisable] = useState(true);
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { role } = res.data.decoded;
        if (role === "root" || role === "admin") {
          setActionDisable(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const dispatch = useDispatch();

  const rawFaqs = useSelector((state) => state.faq);
  const faqs = rawFaqs.map((rawFaq) => ({
    date: rawFaq.createdAt.split("T")[0],
    ...rawFaq,
  }));

  useEffect(() => {
    if (faqs.length === 0) {
      dispatch(getFaqs({ skip: 0, limit: 5 }));
    }
  }, [faqs, dispatch]);

  const loadHandle = () => {
    dispatch(getFaqs({ skip: faqs.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this faq")) {
      // Delete item
      dispatch(deleteFaq({ id }));
    }
  };

  // Backup data
  const [downloadUrl, setDownloadUrl] = useState();
  useEffect(() => {
    resourceApi
      .getResources({ resource: "faq" })
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
          .postResource({ resource: "faq", data: item })
          .then(() => dispatch(getFaqs({ skip: 0, limit: 5 })))
          .catch((error) => console.log(error));
      });
    });
  };

  return (
    <AdminLayout page="FAQ">
      <DataTable
        fields={["question", "answer", "date"]}
        data={faqs}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
      <div className="d-flex justify-content-center my-5">
        <Button variant="outline" onClick={loadHandle} className="px-4 py-2 mx-2">
          Load more
        </Button>
        <Button variant="outline" color="green" className="mx-2">
          <a href={downloadUrl} download="faq.json" className="px-4 py-2" style={{ color: "inherit" }}>
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

export default FaqList;
