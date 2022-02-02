import { Table } from "reactstrap";
import "./IngredientsStaticTable.scss";

const IngredientsStaticTable = ({ingredients}) => {
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((item) =>{
          return <tr className="center">
            <td className="left">{item.name}</td>
            <td colSpan="3">{item.equivalence.cup}</td>
            <td colSpan="2">
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

export default IngredientsStaticTable;
