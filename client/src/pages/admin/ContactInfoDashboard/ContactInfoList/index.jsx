import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactInfo, getContactInfos } from "../contactInfoSlice";
import { authApi } from "api";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";

const ContactInfoList = () => {
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

  const contactInfos = useSelector((state) => state.contactInfo);

  useEffect(() => {
    if (contactInfos.length === 0) {
      dispatch(getContactInfos({ skip: 0, limit: 5 }));
    }
  }, [contactInfos, dispatch]);

  const loadHandle = () => {
    dispatch(getContactInfos({ skip: contactInfos.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this contactInfo")) {
      // Delete item
      dispatch(deleteContactInfo({ id }));
    }
  };

  return (
    <AdminLayout page="CONTACT INFOMATION">
      <DataTable
        fields={["key", "icon", "title"]}
        data={contactInfos}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
    </AdminLayout>
  );
};

export default ContactInfoList;
