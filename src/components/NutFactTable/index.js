import { Table } from "reactstrap";
import "./NutFactTable.scss";

const NutFactTable = (props) => {

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
  } = props

  console.log(props);

  return (
      <div className="frameNutFactTable">
        <Table hover className="nutTable">
           <thead>
             <tr>
               <th colSpan="3" className="titleTable">Información nutricional</th>

             </tr>
             {portion ? (
               <tr className="thickLine">
                <th>Tamaño de la porción:</th>
                <th colSpan="2">{portion} gramos</th>
               </tr>
             ): (
                <tr className="thickLine">
                  <th>Tamaño de la porción:</th>
                  <th colSpan="2">{portion} gramos</th>
                </tr>
             )}
             {energy ? (
               <tr className="mediumLine">
                <th>Energía:</th>
                <th colSpan="2">{energy} Kcalorías</th>
               </tr>
             ): (
                <tr className="thickLine">
                  <th>Tamaño de la porción:</th>
                  <th colSpan="2">No hay Energia</th>
                </tr>
             )}
           </thead>
           <tbody>
             <tr>
               <th></th>
               <td></td>
               <th className="center">% de valor diario *</th>
             </tr>
             {carbohydrate ? (
               <tr>
               <th>Carbohidratos totales:</th>
               <td>{carbohydrate}g</td>
               <th className="center">{dvCarbohydrate}%</th>
             </tr>
             ): (
                ''
             )}
             
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
             {glycemic_load ? (
               <tr>
               <th>Carga glucémica total:</th>
               <th className="center" colSpan="2">{glycemic_load}</th>
             </tr>
               ): (
                  ''
               )}
             
             {fat ? (
               <tr>
               <th>Grasa total:</th>
               <td>{fat}g</td>
               <th className="center">{dvFat}%</th>
             </tr>
             
               ): (
                 ''
               )}


            {saturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos saturados:</td>
              <td>{saturated_fatty_acids}g</td>
              <th className="center">{dvSaturated_fatty_acids}%</th>
            </tr>
            
              ): (
               ''
              )}


            {monounsaturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos monoinsaturados:</td>
              <td>{monounsaturated_fatty_acids}g</td>
              <th className="center">{dvMonounsaturated_fatty_acids}%</th>
            </tr>
            
                ): (
                  ''
                )}
            
            {polyunsaturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos polinsaturados:</td>
              <td>{polyunsaturated_fatty_acids}g</td>
              <th className="center">{dvPolyunsaturated_fatty_acids}%</th>
            </tr>
                ): (
                  ''
                )}

             {protein ? (
               <tr>
               <th>Proteínas totales:</th>
               <td>{protein}g</td>
               <th className="center"></th>
             </tr>
               ): (
                  ''
               )}
             
             {cholesterol ? (
               <tr>
               <th>Colesterol total:</th>
               <td>{cholesterol}g</td>
               <th className="center">{dvCholesterol}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {sodium ? (
               <tr>
               <th>Sodio:</th>
               <td>{sodium}mg</td>
               <th className="center">{dvSodium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {calcium ? (
               <tr>
               <th>Calcio:</th>
               <td>{calcium}mg</td>
               <th className="center">{dvCalcium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {phosphorus ? (
               <tr>
               <th>Fósforo:</th>
               <td>{phosphorus}mg</td>
               <th className="center">{dvPhosphorus}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {iron ? (
               <tr>
               <th>Hierro:</th>
               <td>{iron}mg</td>
               <th className="center">{dvIron}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {potassium ? (
               <tr>
               <th>Potasio:</th>
               <td>{potassium}mg</td>
               <th className="center">{dvPotassium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {magnesium ? (
               <tr>
               <th>Magnesio:</th>
               <td>{magnesium}mg</td>
               <th className="center">{dvMagnesium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {copper ? (
               <tr>
               <th>Cobre:</th>
               <td>{copper}mg</td>
               <th className="center">{dvCopper}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {zinc ? (
               <tr>
               <th>Zinc:</th>
               <td>{zinc}mg</td>
               <th className="center">{dvZinc}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {manganese ? (
               <tr>
               <th>Manganeso:</th>
               <td>{manganese}mg</td>
               <th className="center">{dvManganese}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {selenium ? (
               <tr>
               <th>Selenio:</th>
               <td>{selenium}mg</td>
               <th className="center">{dvSelenium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {lithium ? (
               <tr>
               <th>Litio:</th>
               <td>{lithium}mg</td>
               <th className="center">{dvLithium}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitA ? (
               <tr>
               <th>Vitamina A:</th>
               <td>{vitA}ug</td>
               <th className="center">{dvVitA}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {carotene ? (
               <tr>
               <th>Caroteno:</th>
               <td>{carotene}mg</td>
               <th className="center">{dvCarotene}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {bcarotene ? (
               <tr>
               <th>Beta-caroteno:</th>
               <td>{bcarotene}mg</td>
               <th className="center">{dvBcarotene}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB1 ? (
               <tr>
               <th>Vitamina B1:</th>
               <td>{vitB1}mg</td>
               <th className="center">{dvVitB1}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB2 ? (
               <tr>
               <th>Vitamina B2:</th>
               <td>{vitB2}mg</td>
               <th className="center">{dvVitB2}%</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB3 ? (
               <tr>
               <th>Vitamina B3:</th>
               <td>{vitB3}mg</td>
               <th className="center">{dvVitB3}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitB6 ? (
               <tr>
               <th>Vitamina B6:</th>
               <td>{vitB6}mg</td>
               <th className="center">{dvVitB6}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitB12 ? (
               <tr>
               <th>Vitamina B12:</th>
               <td>{vitB12}mg</td>
               <th className="center">{dvVitB12}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitC ? (
               <tr>
               <th>Vitamina C:</th>
               <td>{vitC}mg</td>
               <th className="center">{dvVitC}%</th>
             </tr>
               ): (
                  ''
               )}
             {folicAc ? (
               <tr>
               <th>Ácido Fólico:</th>
               <td>{folicAc}mg</td>
               <th className="center">{dvFolicAc}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitD ? (
               <tr>
               <th>Vitamina D:</th>
               <td>{vitD}mg</td>
               <th className="center">{dvVitD}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitE ? (
               <tr>
               <th>Vitamina E:</th>
               <td>{vitE}mg</td>
               <th className="center">{dvVitE}%</th>
             </tr>
               ): (
                  ''
               )}
             {vitK ? (
               <tr>
                <th>Vitamina K:</th>
                  <td>{vitK}mg</td>
                <th className="center">{dvVitK}%</th>
              </tr>
               ): (
                  ''
               )}
             
           </tbody>
        </Table>
      </div>
  )};

export default NutFactTable;
