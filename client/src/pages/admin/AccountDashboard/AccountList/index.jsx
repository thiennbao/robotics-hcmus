import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAccountList } from "../accountSlice";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";

const AccountList = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { decoded } = res.data;
        if (decoded.role !== "root") {
          navigate(`./${decoded._id}`);
        } else {
          setIsVerified(true);
        }
      })
      .catch((errors) => {
        navigate(`/auth`);
        console.log(errors);
      });
  }, [navigate]);

  const dispatch = useDispatch();

  const rawAccounts = useSelector((state) => state.account);
  const accounts = rawAccounts.map((rawAccount) => ({ date: rawAccount.createdAt.split("T")[0], ...rawAccount }));

  useEffect(() => {
    if (accounts.length === 0) {
      dispatch(getAccountList({ skip: 0, limit: 5 }));
    }
  }, [accounts, dispatch]);

  const loadHandle = () => {
    dispatch(getAccountList({ skip: accounts.length, limit: 5 }));
  };
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure to delete this account")) {
      dispatch(deleteAccount({ id }));
    }
  };

  return isVerified ? (
    <AdminLayout page="ACCOUNT">
      <DataTable
        fields={["username", "role", "date"]}
        data={accounts}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
      />
    </AdminLayout>
  ) : (
    <Loading fullscreen />
  );
};

export default AccountList;
