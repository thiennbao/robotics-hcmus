import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteLink, getLinks } from "../linkSlice";
import { authApi } from "api";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";

const LinkList = () => {
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

  const links = useSelector((state) => state.link);

  useEffect(() => {
    if (links.length === 0) {
      dispatch(getLinks({ skip: 0, limit: 5 }));
    }
  }, [links, dispatch]);

  const loadHandle = () => {
    dispatch(getLinks({ skip: links.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this link")) {
      // Delete item
      dispatch(deleteLink({ id }));
    }
  };

  return (
    <AdminLayout page="LINK">
      <DataTable
        fields={["index", "title", "content"]}
        data={links}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
        addDisable={actionDisable}
        editDisable={actionDisable}
        deleteDisable={actionDisable}
      />
    </AdminLayout>
  );
};

export default LinkList;
