import Heading from "components/Heading";
import Menu from "./partials/Menu";

const AdminLayout = ({ page, children }) => {
  return (
    <div className="d-flex">
      <Menu />
      <div className="flex-grow-1">
        <div>
          <Heading subcontent="Dashboard">{page}</Heading>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
