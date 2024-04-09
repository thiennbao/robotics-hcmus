import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaq, getFaqs } from "../faqSlice";
import { authApi } from "api";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";

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
    </AdminLayout>
  );
};

export default FaqList;
