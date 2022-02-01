import { Table } from "reactstrap";
import "./IngredientsTable.scss";

const IngredientsTable = ({ingredients}) => {
  console.log(ingredients);

  return (
  <div className="frameIngredientsTable">
    <Table hover size="sm">
      <thead>
        <tr className="thinLine center">
          <th className="left">Ingrediente</th>
          <th colSpan="3">Cantidad</th>
          <th>Porción</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((item) =>{
          return <tr className="center">
            <td className="left">{item.name}</td>
            <td> - </td>
            <td>{item.equivalence.cup}</td>
            <td> + </td>
            <td>tazas</td>
          </tr>
        })}
      </tbody>
    </Table>
  </div>
)};

export default IngredientsTable;
