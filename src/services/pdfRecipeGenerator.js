import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ddFormater from '../utils/recipeDocumentDefination';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfmakedownload = (data) => {

    //  const dd = ddFormater(data);
    const dd = {
        content: [
            {
                text: ` ${data.title}\n\n`,
                style: 'header'
            },
            {
                image: data.url2,
                width: 150
            },
            {
                text: [
                    `${data.synopsis}\n`,
                    {text: 'Tags:', fontSize: 15, bold: true},
                    `${data.tags[0]}, ${data.tags[1]}, ${ data.tags[2]}, ${data.tags[3]}`
                ]
            }
        ]
        
    }

    pdfMake.createPdf(dd).open();
}

export default pdfmakedownload;