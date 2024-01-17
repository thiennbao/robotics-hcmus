import { authApi } from "api";
import Menu from "./partials/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLayout = ({ page, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        if (!res.data.verified) {
          navigate("/auth");
        }
      })
      .catch((errors) => {
        navigate("/auth");
        console.log(errors);
      });
  }, [navigate]);

  return (
    <div className="d-flex">
      <Menu />
      <div className="flex-grow-1">
        <div>
          <h2 subcontent="Dashboard">{page}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
