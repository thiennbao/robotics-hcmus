import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAccountList } from "../accountSlice";
import DataTable from "components/DataTable";
import { useEffect, useState } from "react";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import Button from "components/Button";

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
  const accounts = rawAccounts.map((rawAccount) => ({
    date: rawAccount.createdAt.split("T")[0],
    ...rawAccount,
  }));

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

  // Backup data
  const [downloadUrl, setDownloadUrl] = useState();
  useEffect(() => {
    authApi
      .getAccountList({})
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
        authApi
          .register({ data: item })
          .then(() => dispatch(getAccountList({ skip: 0, limit: 5 })))
          .catch((error) => console.log(error));
      });
    });
  };

  return isVerified ? (
    <AdminLayout page="ACCOUNT">
      <DataTable
        fields={["username", "role", "date"]}
        data={accounts}
        loadHandle={loadHandle}
        deleteHandle={deleteHandle}
      />
      <div className="d-flex justify-content-center my-5">
        <Button variant="outline" onClick={loadHandle} className="px-4 py-2 mx-2">
          Load more
        </Button>
        <Button variant="outline" color="green" className="mx-2">
          <a href={downloadUrl} download="account.json" className="px-4 py-2" style={{ color: "inherit" }}>
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
  ) : (
    <Loading fullscreen />
  );
};

export default AccountList;
