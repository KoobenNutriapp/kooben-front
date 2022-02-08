import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./IngredientsDynamicTable.scss";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientsDynamicTable = ({ ingredients }) => {


  console.log(ingredients);

  const [render, setRender] = useState(ingredients);

  useEffect(() => {
    const initial = () => {
      setRender(ingredients)
  };
  initial();
  }, [ingredients]);


  const handleSelection = (e) => {
    console.log(e.target.value);
  };

  const handleDeleteIngredient = (e) => {
    console.log(e.currentTarget.id);
  };

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
          {render.map((item,i) => {
            return (
              <tr key={item[i]?._id} className="center">
                <td className="left">{item[i]?.name}</td>
                <td> - </td>
                {/* <td>{item.equivalence?.cup}</td> */}
                <td> + </td>
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
                <td className="bin2" onClick={handleDeleteIngredient}>
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
