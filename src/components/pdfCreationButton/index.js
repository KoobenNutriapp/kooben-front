import * as React from 'react';
import "./pdfCreationButton.scss"
import pdfmakedownload from "../../services/PdfRecipeCreator";

const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));

const PdfCreationButton = ({ content }) => {
    let data = content
    const exportHandler = async () => {
        console.log('llamando data')
        console.log(data);
        data.url2 = await toDataURL(data.url)
        console.log(data.url2)
        console.log('se codifico')
        console.log('Convierte PDF')
        await pdfmakedownload(data);
    };
    
    return (
      <button
        className="button-donar btn btn-info"
        onClick={exportHandler}
      >
        ExportarComponeent
      </button>
    );
  };

export default PdfCreationButton;