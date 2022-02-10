import { Table } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./IngredientsDynamicTable.scss";
import SelectPortion from "../SelectPortion/";

const IngredientsDynamicTable = ({ ingredients, callback }) => {

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
            <th colSpan="1">Porción</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item) => {
            //console.log(item);
            return (
                <tr key={item._id} className="center">
                  <td className="left">{item.name}</td>

                  <SelectPortion 
                    equivalence={item.equivalence}
                    // callback={} 
                  />

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
