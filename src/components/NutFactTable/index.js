import { Table } from "reactstrap";
import "./NutFactTable.scss";

const NutFactTable = ({ingredient,operation, typePortion, firstSelection}) => {

  const {
    portion,
    energy,
    carbohydrate,
    dvCarbohydrate,
    sugars,
    fiber,
    dvFiber,
    protein,
    fat,
    dvFat,
    saturated_fatty_acids,
    dvSaturated_fatty_acids,
    monounsaturated_fatty_acids,
    dvMonounsaturated_fatty_acids,
    polyunsaturated_fatty_acids,
    dvPolyunsaturated_fatty_acids,
    cholesterol,
    dvCholesterol,
    glycemic_load,
    sodium,
    dvSodium,
    calcium,
    dvCalcium,
    phosphorus,
    dvPhosphorus,
    iron,
    dvIron,
    potassium,
    dvPotassium,
    magnesium,
    dvMagnesium,
    copper,
    dvCopper,
    zinc,
    dvZinc,
    manganese,
    dvManganese,
    selenium,
    dvSelenium,
    lithium,
    dvLithium,
    vitA,
    dvVitA,
    carotene,
    dvCarotene,
    bcarotene,
    dvBcarotene,
    vitB1,
    dvVitB1,
    vitB2,
    dvVitB2,
    vitB3,
    dvVitB3,
    vitB6,
    dvVitB6,
    vitB12,
    dvVitB12,
    vitC,
    dvVitC,
    folicAc,
    dvFolicAc,
    vitD,
    dvVitD,
    vitE,
    dvVitE,
    vitK,
    dvVitK,
  } = ingredient

  console.log(ingredient,operation,typePortion, firstSelection);

  return (
      <div className="frameNutFactTable">
        <Table hover className="nutTable">
           <thead>
             <tr>
               <th colSpan="3" className="titleTable">Información nutricional</th>

             </tr>
             <tr className="thickLine">
                <th>Tamaño de la porción:</th>
                <th colSpan="2">{portion} gramos</th>
             </tr>
             <tr className="mediumLine">
                <th>Energía:</th>
                <th colSpan="2">{energy} Kcalorías</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <th></th>
               <td></td>
               <th className="center">% de valor diario *</th>
             </tr>
             <tr>
               <th>Carbohidratos totales:</th>
               <td>{carbohydrate}g</td>
               <th className="center">{dvCarbohydrate}%</th>
             </tr>
             <tr>
               <td> - Fibra:</td>
               <td>{fiber}g</td>
               <th className="center">{dvFiber}%</th>
             </tr>
             <tr>
               <td> - Azúcares:</td>
               <td>{sugars}g</td>
               <th className="center"></th>
             </tr>
             <tr>
               <th>Carga glucémica total:</th>
               <th className="center" colSpan="2">{glycemic_load}</th>
             </tr>
             <tr>
               <th>Grasa total:</th>
               <td>{fat}g</td>
               <th className="center">{dvFat}%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos saturados:</td>
               <td>{saturated_fatty_acids}g</td>
               <th className="center">{dvSaturated_fatty_acids}%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos monoinsaturados:</td>
               <td>{monounsaturated_fatty_acids}g</td>
               <th className="center">{dvMonounsaturated_fatty_acids}%</th>
             </tr>
             <tr>
               <td> - Ácidos grasos polinsaturados:</td>
               <td>{polyunsaturated_fatty_acids}g</td>
               <th className="center">{dvPolyunsaturated_fatty_acids}%</th>
             </tr>
             <tr>
               <th>Proteínas totales:</th>
               <td>{protein}g</td>
               <th className="center"></th>
             </tr>
             <tr>
               <th>Colesterol total:</th>
               <td>{cholesterol}g</td>
               <th className="center">{dvCholesterol}%</th>
             </tr>
             <tr>
               <th>Sodio:</th>
               <td>{sodium}mg</td>
               <th className="center">{dvSodium}%</th>
             </tr>
             <tr>
               <th>Calcio:</th>
               <td>{calcium}mg</td>
               <th className="center">{dvCalcium}%</th>
             </tr>
             <tr>
               <th>Fósforo:</th>
               <td>{phosphorus}mg</td>
               <th className="center">{dvPhosphorus}%</th>
             </tr>
             <tr>
               <th>Hierro:</th>
               <td>{iron}mg</td>
               <th className="center">{dvIron}%</th>
             </tr>
             <tr>
               <th>Potasio:</th>
               <td>{potassium}mg</td>
               <th className="center">{dvPotassium}%</th>
             </tr>
             <tr>
               <th>Magnesio:</th>
               <td>{magnesium}mg</td>
               <th className="center">{dvMagnesium}%</th>
             </tr>
             <tr>
               <th>Cobre:</th>
               <td>{copper}mg</td>
               <th className="center">{dvCopper}%</th>
             </tr>
             <tr>
               <th>Zinc:</th>
               <td>{zinc}mg</td>
               <th className="center">{dvZinc}%</th>
             </tr>
             <tr>
               <th>Manganeso:</th>
               <td>{manganese}mg</td>
               <th className="center">{dvManganese}%</th>
             </tr>
             <tr>
               <th>Selenio:</th>
               <td>{selenium}mg</td>
               <th className="center">{dvSelenium}%</th>
             </tr>
             <tr>
               <th>Litio:</th>
               <td>{lithium}mg</td>
               <th className="center">{dvLithium}%</th>
             </tr>
             <tr>
               <th>Vitamina A:</th>
               <td>{vitA}ug</td>
               <th className="center">{dvVitA}%</th>
             </tr>
             <tr>
               <th>Caroteno:</th>
               <td>{carotene}mg</td>
               <th className="center">{dvCarotene}%</th>
             </tr>
             <tr>
               <th>Beta-caroteno:</th>
               <td>{bcarotene}mg</td>
               <th className="center">{dvBcarotene}%</th>
             </tr>
             <tr>
               <th>Vitamina B1:</th>
               <td>{vitB1}mg</td>
               <th className="center">{dvVitB1}%</th>
             </tr>
             <tr>
               <th>Vitamina B2:</th>
               <td>{vitB2}mg</td>
               <th className="center">{dvVitB2}%</th>
             </tr>
             <tr>
               <th>Vitamina B3:</th>
               <td>{vitB3}mg</td>
               <th className="center">{dvVitB3}%</th>
             </tr>
             <tr>
               <th>Vitamina B6:</th>
               <td>{vitB6}mg</td>
               <th className="center">{dvVitB6}%</th>
             </tr>
             <tr>
               <th>Vitamina B12:</th>
               <td>{vitB12}mg</td>
               <th className="center">{dvVitB12}%</th>
             </tr>
             <tr>
               <th>Vitamina C:</th>
               <td>{vitC}mg</td>
               <th className="center">{dvVitC}%</th>
             </tr>
             <tr>
               <th>Ácido Fólico:</th>
               <td>{folicAc}mg</td>
               <th className="center">{dvFolicAc}%</th>
             </tr>
             <tr>
               <th>Vitamina D:</th>
               <td>{vitD}mg</td>
               <th className="center">{dvVitD}%</th>
             </tr>
             <tr>
               <th>Vitamina E:</th>
               <td>{vitE}mg</td>
               <th className="center">{dvVitE}%</th>
             </tr>
             <tr>
               <th>Vitamina K:</th>
               <td>{vitK}mg</td>
               <th className="center">{dvVitK}%</th>
             </tr>
           </tbody>
        </Table>
      </div>
  )};

export default NutFactTable;
