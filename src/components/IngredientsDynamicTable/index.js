import { Table } from "reactstrap";
import "./IngredientsDynamicTable.scss";

const IngredientsDynamicTable = ({ingredients}) => {
  console.log(ingredients);

  const handleSelection = (e) => {
    console.log(e.target.value);
  }

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
            <td>
              <select onChange={handleSelection}className="form-select selectPortion">
                <option value="gram">tazas</option>
                <option value="cup">gramos</option>
                <option value="piece">piezas</option>
              </select>
            </td>
          </tr>
        })}
      </tbody>
    </Table>
  </div>
)};

export default IngredientsDynamicTable;
