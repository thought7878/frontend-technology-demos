import "./table.css";
import Pagination from "../pagination";

const Table = ({ columns, data, pagination }) => {
  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((rowData) => (
            <tr key={rowData.id}>
              {columns?.map((column) => (
                <td key={`${rowData.id}-${column.field}`}>
                  {rowData[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && <Pagination {...pagination} />}
    </>
  );
};

export default Table;
