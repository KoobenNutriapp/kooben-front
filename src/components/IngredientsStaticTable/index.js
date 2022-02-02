import { Table } from "reactstrap";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./IngredientsStaticTable.scss";

const IngredientsStaticTable = ({ingredients}) => {
  console.log(ingredients);

  const handleSelection = (e) => {
    console.log(e.target.id);
  }

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
                  <DropdownItem onClick={handleSelection} id="cup" eventKey="tazas">tazas</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleSelection} id="piece" eventKey="piezas">piezas</DropdownItem>
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
