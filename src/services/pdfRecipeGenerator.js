import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ddFormater from '../utils/recipeDocumentDefination';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfmakedownload = (data) => {

     const dd = ddFormater(data);


    //  dd.dom = JSON.stringify(dd);
    //  dd.dom = JSON.parse(dd);

    pdfMake.createPdf(dd).open();
}

export default pdfmakedownload;                     