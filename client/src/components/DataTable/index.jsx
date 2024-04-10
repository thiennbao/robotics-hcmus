import Button from "components/Button";
import style from "./DataTable.module.scss";

const DataTable = ({
  fields,
  data,
  loadHandle,
  deleteHandle,
  addDisable,
  editDisable,
  deleteDisable,
}) => {
  const isURL = (string) => {
    try {
      new URL(string);
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
            <th>
              <div className="d-flex justify-content-center">
                <Button variant="outline" color="green" to={!addDisable && "./add"} className={addDisable && style.disable}>
                  Add
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {fields.map((field) => (
                <td key={field}>
                  {isURL(item[field]) ? (
                    <img src={item[field]} alt="" />
                  ) : (
                    <span>{item[field]}</span>
                  )}
                </td>
              ))}
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" to={!editDisable && `./${item._id}`} className={editDisable && style.disable}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={deleteDisable ? (() => {}) : (() => deleteHandle(item._id))}
                    className={deleteDisable && style.disable}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
