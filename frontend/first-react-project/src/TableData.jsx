function TableData({ col = [], data = [] }) {
  const colList = col.map((c) => <th key={c.key}>{c.lable}</th>);
  const  dataList  = data.map((dataItem) => (
    <tr key={dataItem.id}>
      <td>{dataItem.id}</td>
      <td>{dataItem.username}</td>
      <td>{dataItem.email}</td>
      <td>{dataItem.provider}</td>
    </tr>
  ));
 
  return (
    <table className="table">
      <thead>
        <tr>{colList}</tr>
      </thead>
      <tbody>{dataList}</tbody>
    </table>
  );
}
export default TableData;