import { Table } from "reactstrap";
import "./IngredientsStaticTable.scss";

const IngredientsStaticTable = ({name,cups,spoons,pieces}) => {
  console.log(name);
  return (
  <div className="frame2">
    <Table hover>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{cups}</td>
          <td>tazas</td>
        </tr>
      </tbody>
    </Table>
  </div>
)};

export default IngredientsStaticTable;
