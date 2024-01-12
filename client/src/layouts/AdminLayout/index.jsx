import Menu from "./partials/Menu";

const AdminLayout = ({ page, children }) => {
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
