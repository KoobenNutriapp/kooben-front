import { useState, useEffect } from 'react';
import { Table, Label, Input } from "reactstrap";
import "./FiltersTable.scss";

const FiltersTable = ({callback}) => {
  
  const [selection, setSelection] = useState([]);
  const [prehispanic, setPrehispanic] = useState(false);
  const [calories, setCalories] = useState(false);
  const [carbohydrates, setCarbohydrates] = useState(false);
  const [sodium, setSodium] = useState(false);
  const [protein, setProtein] = useState(false);
  const [fat, setFat] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [glycemicLoad, setGlycemicLoad] = useState(false);

  useEffect(() => {     
    callback(selection)
  },[selection]);
  
  const handleFilters = (e) => {
    const activated = e.target.checked;
    const id = e.target.id

    switch (true) {
      case id.includes('prehispanic'):
        setPrehispanic(!prehispanic);
        break;
      case id.includes('calories'):
        setCalories(!calories);
        break;
      case id.includes('carbohydrates'):
        setCarbohydrates(!carbohydrates);
        break;
      case id.includes('sodium'):
        setSodium(!sodium);
        break;
      case id.includes('protein'):
        setProtein(!protein);
        break;
      case id.includes('fat'):
        setFat(!fat);
        break;      
      case id.includes('cholesterol'):
        setCholesterol(!cholesterol);
        break;
      case id.includes('glycemic'):
        setGlycemicLoad(!glycemicLoad);
        break;     
      default:
        break;
    }

    const removeItemFromArr = ( arr, item ) => {
      return arr.filter( e => e !== item );
    };

    if(activated){
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
            <td className={prehispanic ? 'pedernal rotation': 'pedernal'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_calories=true" />{" "}
                Bajo en Kilocalorías
              </Label>
            </td>
            <td className={calories? 'chimalli1 rotation': 'chimalli1'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_carbohydrates=true" />{" "}
                Bajo en carbohidratos
              </Label>
            </td>
            <td className={carbohydrates? 'agua rotation': 'agua'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_sodium=true" />{" "}
                Bajo en sodio
              </Label>
            </td>
            <td className={sodium? 'coatl rotation': 'coatl'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="high_protein=true" />{" "}
                Alto en proteína
              </Label>
            </td>
            <td className={protein ? 'venado rotation': 'venado'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_fat=true" />{" "}
                Bajo en grasa
              </Label>
            </td>
            <td className={fat? 'movimiento rotation': 'movimiento'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_cholesterol=true" />{" "}
                Bajo en colesterol
              </Label>
            </td>
            <td className={cholesterol? 'aguila rotation': 'aguila'}></td>
          </tr>
          <tr>
            <td>
              <Label check>
                <Input type="checkbox" onChange={handleFilters} id="low_glycemic_load=true" />{" "}
                Bajo en carga glucémica
              </Label>
            </td>
            <td className={glycemicLoad? 'conejo rotation': 'conejo'}></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FiltersTable;
