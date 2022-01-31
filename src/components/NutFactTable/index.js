import { Table } from "reactstrap";
import "./NutFactTable.scss";

const NutFactTable = (props) => {

  const {
    portion,
    energy,
    carbohydrate,
    sugars,
    fiber,
    protein,
    fat,
    saturated_fatty_acids,
    monounsaturated_fatty_acids,
    polyunsaturated_fatty_acids,
    cholesterol,
    glycemic_load,
    sodium,
    calcium,
    phosphorus,
    iron,
    potassium,
    magnesium,
    copper,
    zinc,
    manganese,
    selenium,
    lithium,
    vitA,
    carotene,
    bcarotene,
    vitB1,
    vitB2,
    vitB3,
    vitB6,
    vitB12,
    vitC,
    folicAc,
    vitD,
    vitE,
    vitK,
  } = props

  console.log(props);

  return (
    <>
      <div className="container">
        <Table hover className="nutTable">
           <thead>
             <tr>
               <th className="titleTable">Información nutricional</th>
               <th></th>
               <th></th>
             </tr>
             <tr className="thickLine">
                <th>Tamaño de la porción:</th>
                <th>{portion} gramos</th>
             </tr>
             <tr className="mediumLine">
                <th>Energía:</th>
                <th>{energy} Kcalorías</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <th></th>
               <td></td>
               <th>% de valor diario *</th>
             </tr>
             <tr>
               <th>Carbohidratos totales:</th>
               <td>{carbohydrate}g</td>
               <th>1%</th>
             </tr>
             <tr>
               <td> - Fibra:</td>
               <td>{fiber}g</td>
               <th>0%</th>
             </tr>
             <tr>
               <td> - Azúcares:</td>
               <td>{sugars}g</td>
               <th>0%</th>
             </tr>
             <tr>
               <th>Grasa total:</th>
               <td>{fat}g</td>
               <th>1%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos saturados:</td>
               <td>{saturated_fatty_acids}g</td>
               <th>0%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos monoinsaturados:</td>
               <td>{monounsaturated_fatty_acids}g</td>
               <th>0%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos polinsaturados:</td>
               <td>{polyunsaturated_fatty_acids}g</td>
               <th>0%</th>
             </tr>
             <tr>
               <th>Proteínas totales:</th>
               <td>{protein}g</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Colesterol total:</th>
               <td>{cholesterol}g</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Carga glucémica total:</th>
               <td>{glycemic_load}</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Sodio:</th>
               <td>{sodium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Calcio:</th>
               <td>{calcium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Fósforo:</th>
               <td>{phosphorus}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Hierro:</th>
               <td>{iron}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Potasio:</th>
               <td>{potassium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Magnesio:</th>
               <td>{magnesium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Cobre:</th>
               <td>{copper}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Zinc:</th>
               <td>{zinc}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Manganeso:</th>
               <td>{manganese}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Selenio:</th>
               <td>{selenium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Litio:</th>
               <td>{lithium}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina A:</th>
               <td>{vitA}ug</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Caroteno:</th>
               <td>{carotene}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Beta-caroteno:</th>
               <td>{bcarotene}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina B1:</th>
               <td>{vitB1}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina B2:</th>
               <td>{vitB2}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina B3:</th>
               <td>{vitB3}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina B6:</th>
               <td>{vitB6}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina B12:</th>
               <td>{vitB12}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina C:</th>
               <td>{vitC}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Ácido Fólico:</th>
               <td>{folicAc}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina D:</th>
               <td>{vitD}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina E:</th>
               <td>{vitE}mg</td>
               <th>1%</th>
             </tr>
             <tr>
               <th>Vitamina K:</th>
               <td>{vitK}mg</td>
               <th>1%</th>
             </tr>
           </tbody>
        </Table>
      </div>
    </>
  )};

export default NutFactTable;
