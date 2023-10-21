import style from "./DataTable.module.scss";
import Button from "components/Button";

const DataTable = ({ fields, data, viewOnly, actionHandler }) => {
  const [pickHandler, deleteHandler, loadHandler] = actionHandler;

  const isImage = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className={style.dataTable}>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
            {!viewOnly && (
              <th>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" color="green" onClick={() => pickHandler(0)}>
                    Add
                  </Button>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {fields.map((field) => (
                <td key={field}>
                  {isImage(item[field]) ? (
                    <img src={item[field]} alt="" />
                  ) : (
                    <span>{item[field]}</span>
                  )}
                </td>
              ))}
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" onClick={() => pickHandler(item._id)}>
                    {viewOnly ? "View" : "Edit"}
                  </Button>
                  <Button variant="outline" color="red" onClick={() => deleteHandler(item._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outline" className={style.loadButton} onClick={loadHandler}>
        Load more
      </Button>
    </div>
  );
};

export default DataTable;
