import { useState } from "react";
import { Table } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import "./IngredientsDynamicTable.scss";
import SelectPortion from "../SelectPortion/";

const IngredientsDynamicTable = ({ ingredients, callback, nutData }) => {

  const [dinerCounter, setDinerCounter] = useState(1)

  const handleDeleteIngredient = (e) => {
    callback(e.currentTarget.id)
  }

  return (
    <>
      <div className="diners">
        <Tooltip title="menos personas" placement="left-start">
          <IconButton onClick={(e) => setDinerCounter(dinerCounter - 1)}>
            <PersonRemoveIcon className="people-blue"/>
          </IconButton>
        </Tooltip>
        <div className="diners-number">{dinerCounter}</div>
        <Tooltip title="mas personas" placement="right-start">
          <IconButton onClick={(e) => setDinerCounter(dinerCounter + 1)}>
            <PersonAddAlt1Icon className="people-pink"/>
          </IconButton>
        </Tooltip>
      </div>
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
                      ingredient={item}
                      nutData={nutData}
                      people={dinerCounter}
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
    </>
  );
};

export default IngredientsDynamicTable;
