import { authApi } from "api";
import Menu from "./partials/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminLayout = ({ page, children }) => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    authApi
      .verify()
      .then((res) => {
        if (!res.data.verified) {
          navigate("/auth");
        } else {
          setIsVerified(true);
        }
      })
      .catch((errors) => {
        navigate("/auth");
        console.log(errors);
      });
  }, [navigate]);

  return (
    isVerified && (
      <div className="d-flex">
        <Menu />
        <div className="flex-grow-1">
          <div>
            <h2 subcontent="Dashboard">{page}</h2>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLayout;
