import Button from "components/Button";
import style from "./DataTable.module.scss";

const DataTable = ({ fields, data, pick, remove, load, readOnly }) => {
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
            {!readOnly && (
              <th>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" color="green" onClick={() => pick(null)}>
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
                  {isURL(item[field]) ? (
                    <img src={item[field]} alt="" />
                  ) : (
                    <span>{item[field]}</span>
                  )}
                </td>
              ))}
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="outline" onClick={() => pick(item._id)}>
                    Edit
                  </Button>
                  <Button variant="outline" color="red" onClick={() => remove(item._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outline" className={style.loadButton} onClick={load}>
        Load more
      </Button>
    </div>
  );
};

export default DataTable;
