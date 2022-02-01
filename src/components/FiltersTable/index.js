import { Table,Label,Input } from "reactstrap";
import "./FiltersTable.scss";



const FiltersTable = () => {

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
            <Label check><Input type="checkbox" />{' '}Bajo en Kilocalorías</Label>
          </td>
          <td className="pedernal rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en carbohidratos</Label>
          </td>
          <td className="agua rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en azúcares</Label>
          </td>
          <td className="tepetl rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Alto en fibra</Label>
          </td>
          <td className="chimalli1 rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en sodio</Label>
          </td>
          <td className="coatl rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Alto en proteína</Label>
          </td>
          <td className="venado rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en grasa</Label>
          </td>
          <td className="movimiento rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en colesterol</Label>
          </td>
          <td className="aguila rotation"></td>
        </tr>
        <tr>
          <td>          
            <Label check><Input type="checkbox" />{' '}Bajo en carga glucémica</Label>
          </td>
          <td className="conejo rotation"></td>
        </tr>
      </tbody>
    </Table>
  </div>
)};

export default FiltersTable;