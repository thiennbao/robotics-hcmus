import Menu from "./partials/Menu";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Menu />
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
