import { useState } from 'react';
import { Table, Label, Input } from "reactstrap";
import "./FiltersTable.scss";

const FiltersTable = ({callback}) => {
  console.log(callback);
  
  const [selection, setSelection] = useState([]);
  
  const handleFilters = (e) => {
    const checked = e.target.checked;
    const id = e.target.id

    const removeItemFromArr = ( arr, item ) => {
      return arr.filter( e => e !== item );
    };

    if(checked){
      setSelection([...selection,id])
    }else{
      const removeSelection = removeItemFromArr(selection,id)
      setSelection(removeSelection);
    }

    callback(selection)
  };

  console.table(selection);

  return (
    <div className="frameFiltersTable">
      <Table hover size="sm">
        <thead>
          <tr className="filterTitle">
            <th colSpan="3">Filtros</th>
          </tr>
        </thead>
        <tbody className="filterItems">
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="calories" />{" "}
                Bajo en Kilocalorías
              </Label>
            </td>
            <td className="pedernal rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="carbohydrates" />{" "}
                Bajo en carbohidratos
              </Label>
            </td>
            <td className="agua rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="sugars" />{" "}
                Bajo en azúcares
              </Label>
            </td>
            <td className="tepetl rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="fiber" />{" "}
                Alto en fibra
              </Label>
            </td>
            <td className="chimalli1 rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="sodium" />{" "}
                Bajo en sodio
              </Label>
            </td>
            <td className="coatl rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="protein" />{" "}
                Alto en proteína
              </Label>
            </td>
            <td className="venado rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="fat" />{" "}
                Bajo en grasa
              </Label>
            </td>
            <td className="movimiento rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="cholesterol" />{" "}
                Bajo en colesterol
              </Label>
            </td>
            <td className="aguila rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="glycemic_load" />{" "}
                Bajo en carga glucémica
              </Label>
            </td>
            <td className="conejo rotation"></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FiltersTable;
