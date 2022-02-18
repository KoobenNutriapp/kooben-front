import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//alternatuive name function
// const pdfmakedownload = (data)

function pdfmakedownload(data){

    // const getEachStep = (step) => {
        // const eachStep = [
        //     {
        //         image: `${step.url2}`,
        //     },
        //     {
        //         text: `${step.text}`
        //     }
        // ];

    //     return eachStep;
    // };


    const steps = data.procedures.map((step) => {
        return `${step}`
    });

    // const steps = data.steps.map((step) => {
    //     return getEachStep(step);
    // });

    const dd = {
        content: [
            {
                text: `${data.title}`,
                style: 'header'
            },
            {   
                image: `${data.url2}`,
                width: 100
            },
            {
                text: [
                    `${data.synopsis}\n`,
                    {text: 'Tags:', fontSize: 15, bold: true},
                    `${data.tags[0]}, ${data.tags[1]}, ${ data.tags[2]}, ${data.tags[3]}`
                ]
            },
            {
                text: 'Ingredientes:',
                style: 'subheader'
            },
            {
                text: 'Preparación:',
                style: 'subheader'
            },
            {
                ol: steps
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            subheader: {
                fontSize: 16,
                bold: true
            }
        }
    };

    // return dd;
    pdfMake.createPdf(dd).download();
}

// export default PDFRecipeCreator
export default pdfmakedownload