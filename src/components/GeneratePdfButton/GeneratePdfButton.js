// import * as React from 'react';
import "./GeneratePdfButton.scss"
import pdfmakedownload from "../../services/PdfRecipeCreator";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
import DonationButton from "../DonationButton"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

let download = false
const GeneratePdfButton = ({ content }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    
    let data = content

    const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));
    
    const toggle = () => {
      console.log(download)
      if(!download){
        exportHandler()
        download = true
      }
      
      return setModal(!modal);
    }
    const exportHandler = async () => {
        console.log('llamando data')
        // console.log(data);
        data.url2 = await toDataURL(data.url)
        // console.log(data.url2)
        console.log('se codifico')
        console.log('Convierte PDF')
        await pdfmakedownload(data);
    };

    const handleDelete = async (e) =>{
        e.preventDefault()
        console.log('Eliminando');
    
        try {
          //Do something
          console.log('something')
        } catch (error) {
          console.error(error.message);
        }
        
        toggle()
        navigate('/');
      } 
    
    return (
    <div>
            <Tooltip title="guardar receta" placement="left-start">
              <IconButton>
                <SaveAltIcon 
                  className="saveRecipe" 
                  onClick={toggle}
                  // onClick={<GeneratePdfButton content={metaData}  />}
                />
              </IconButton>
            </Tooltip>
      {/* <button 
        type="submit" onClick={toggle}
        className="button-donar btn btn-info"
      >
          GenerarPDF
      </button> */}
      <Modal isOpen={modal} toggle={toggle}>
          <ModalBody >
            Hoy por nosotros, mañana por ti
            <DonationButton
              ammount={"10.00"}
              itemID="price_1KVNX9AqezYdKBDlm6ObBNND"
            ></DonationButton>
            <DonationButton
              ammount={"10.00"}
              itemID="price_1KVNX9AqezYdKBDlm6ObBNND"
          ></DonationButton>
          </ModalBody>
          <ModalFooter>
              <Link to={'/'}>
              <Button className="modal-button-delete" onClick={handleDelete} >
                Solo, obtener receta.
              </Button>
              </Link>
          </ModalFooter>
        </Modal>
    </div>);
    
  };

export default GeneratePdfButton;