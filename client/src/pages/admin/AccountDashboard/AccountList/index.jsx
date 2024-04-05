import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAccountList } from "../accountSlice";
import DataTable from "components/DataTable";
import { useEffect } from "react";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";

const AccountList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        const { decoded } = res.data;
        if (decoded.role !== 1) {
          navigate(`./${decoded._id}`);
        }
      })
      .catch((errors) => {
        navigate(`/admin`);
        console.log(errors);
      });
  }, [navigate]);

  const dispatch = useDispatch();

  const rawAccounts = useSelector((state) => state.account);
  const accounts = rawAccounts.map((rawAccount) => {
    const account = { ...rawAccount };
    if (rawAccount.role === 1) {
      account.role = "administrator";
    } else if (rawAccount.role === 0) {
      account.role = "manager";
    }
    account.date = rawAccount.createdAt?.split("T")[0];
    return account;
  });

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

  return (
    <AdminLayout page="ACCOUNT">
      <DataTable
        fields={["username", "role", "date"]}
        data={accounts}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
      />
    </AdminLayout>
  );
};

export default AccountList;
