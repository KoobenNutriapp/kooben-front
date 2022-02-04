import { useState, useEffect } from 'react';
import { Table, Label, Input } from "reactstrap";
import "./FiltersTable.scss";

const FiltersTable = ({callback}) => {
  
  const [selection, setSelection] = useState([]);

  useEffect(() => {     
    callback(selection)
  },[selection]);
  
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
  };


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
                <Input type="checkbox" onChange={handleFilters} id="type=prehispanic" />{" "}
                Prehispánico
              </Label>
            </td>
            <td className="pedernal rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_calories=true" />{" "}
                Bajo en Kilocalorías
              </Label>
            </td>
            <td className="pedernal rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_carbohydrates=true" />{" "}
                Bajo en carbohidratos
              </Label>
            </td>
            <td className="agua rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_sugars=true" />{" "}
                Bajo en azúcares
              </Label>
            </td>
            <td className="tepetl rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="high_fiber=true" />{" "}
                Alto en fibra
              </Label>
            </td>
            <td className="chimalli1 rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_sodium=true" />{" "}
                Bajo en sodio
              </Label>
            </td>
            <td className="coatl rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="high_protein=true" />{" "}
                Alto en proteína
              </Label>
            </td>
            <td className="venado rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_fat=true" />{" "}
                Bajo en grasa
              </Label>
            </td>
            <td className="movimiento rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_cholesterol=true" />{" "}
                Bajo en colesterol
              </Label>
            </td>
            <td className="aguila rotation"></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_glycemic_load=true" />{" "}
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
