import { Table } from "reactstrap";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./IngredientsStaticTable.scss";

const IngredientsStaticTable = ({ingredients}) => {
  console.log(ingredients);

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
        {ingredients.map((item) =>{
          return <tr className="center">
            <td className="left">{item.name}</td>
            <td colSpan="3">{item.equivalence.cup}</td>
            <td>
              <UncontrolledDropdown direction="right">
                <DropdownToggle color="info" caret>
                  gramos
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>tazas</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>piezas</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        })}
      </tbody>
    </Table>
  </div>
)};

export default IngredientsStaticTable;
