type TableRowData = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
};

const TableComponent = ({ data }: { data: TableRowData[] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: TableRowData, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.cpf}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
