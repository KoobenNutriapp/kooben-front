import { Table } from "reactstrap";
import "./IngredientsTableHeader.scss";

const IngredientTableHeader = () => {
  return (
  <div className="frame2">
    <Table>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Cantidad</th>
          <th>Porción</th>
        </tr>
      </thead>
    </Table>
</div>
)};

export default IngredientTableHeader;
