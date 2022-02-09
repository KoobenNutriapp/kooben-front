import { Table } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./IngredientsDynamicTable.scss";

const IngredientsDynamicTable = ({ ingredients, callback }) => {
  const handleSelection = (e) => {
  };

  const handleDeleteIngredient = (e) => {
    callback(e.currentTarget.id)
  }

  return (
    <div className="frameIngredientsTable">
      <Table hover size="sm">
        <thead>
          <tr className="thinLine center">
            <th className="left">Ingrediente</th>
            <th colSpan="3">Cantidad</th>
            <th colSpan="2">Porción</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item) => {
            console.log(item);
            return (
                <tr key={item._id} className="center">
                  <td className="left">{item.name}</td>
                  <td>-</td>
                  <td colSpan="2">cantidad</td>
                  {/* <td>{item.equivalence?.cup}</td> */}
                  <td>+</td>
                  <td>
                    <select
                      onChange={handleSelection}
                      className="form-select selectPortion"
                    >
                      <option value="cup">tazas</option>
                      <option value="gram">gramos</option>
                      <option value="piece">piezas</option>
                    </select>
                  </td>
                  <td className="bin2" id={item._id} onClick={handleDeleteIngredient}>
                  {
                    <Tooltip title="Elimina ingrediente" placement="right-start">
                      <IconButton>
                        <DeleteIcon className="bin"/>
                      </IconButton>
                    </Tooltip>
                  }
                </td>
                </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default IngredientsDynamicTable;
