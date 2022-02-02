import { Table } from "reactstrap";
import "./IngredientsStaticTable.scss";
import { ImBin2 } from "react-icons/im";


const IngredientsStaticTable = ({ingredients}) => {
  console.log(ingredients);

  const handleSelection = (e) => {
    console.log(e.target.value);
  }

  const handleDeleteIngredient = (e) => {
    console.log(e.currentTarget.id);
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
        {ingredients.map((item,index) =>{
          return <tr id="" className="center">
            <td className="left">{item.name}</td>
            <td colSpan="3">{item.equivalence.cup}</td>
            <td colSpan="2">
              <select onChange={handleSelection}className="form-select selectPortion">
                <option value="cup">tazas</option>
                <option value="gram">gramos</option>
                <option value="piece">piezas</option>
              </select>
            </td>
            <td id={index} className="bin" onClick={handleDeleteIngredient}>{<ImBin2 />}</td>
          </tr>
        })}
      </tbody>
    </Table>
  </div>
)};

export default IngredientsStaticTable;
