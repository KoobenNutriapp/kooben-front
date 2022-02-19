import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//alternatuive name function
// const pdfmakedownload = (data)

function pdfmakedownload(data){


    const tags = data.tags.map((tag) => {
        return `${tag}`
    });

    const steps = data.procedures.map((step) => {
        return `${step}`
    });

    const ingredients = data.ingredients.map((ingredient) => {
        return `${ingredient.name}`
    });

    // const steps = data.steps.map((step) => {
    //     return getEachStep(step);
    // });

    const dd = {
        content: [
            // {
            //     stack: [

            //     ]
            // },
            {
                text: `${data.title}`,
                style: 'header'
            },
            {
                image: `${data.url2}`,
                width: 320,
                alignment: 'center'

            },
            {
                text: `${data.synopsis}\n`
            },
            {
                text: [{text: 'Tags:', fontSize: 15, bold: true}],
                ul: tags
            },
            {
                text: 'Ingredientes:',
                style: 'subheader'
            },
            {
                ol: ingredients
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
                fontSize: 22,
                bold: true,
                alignment: 'center'
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