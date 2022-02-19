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
            {
                stack: [
                    `${data.title}`
                ],
                style: 'header'
            },
            {
                stack: [
                    {
                        image: `${data.url2}`,
                        width: 320,
                        alignment: 'center',
                        margin: [0, 10, 0, 10]
                    }
                ]
            },
            {
                stack: [
                    `${data.synopsis}\n`
                ],
                italics: true,
                margin: [50, 10, 50, 10]
            },
            // {
            //     text: [{text: 'Tags:', fontSize: 15, bold: true}],
            //     ul: tags
            // },
            {
                stack: [
                    {
                        text: 'Ingredientes:',
                        style: 'subtitle'
                    },
                    {
                        ol: ingredients
                    }
                ], margin: [0, 10, 0, 10]
            },
            {
                stack: [
                    {
                        text: 'Preparación:',
                        style: 'subtitle'
                    },
                    {
                        ol: steps
                    }
                ], margin: [0, 10, 0, 10]
            },
            // {
            //     table: {
            //         body: [
            //             text: [{text: "Información Nutrimental\n", style: 'tableHeader'},
            //                 {text: 'Tamaño de la porción: 100 g'}]
            //         ]
            //     }
            // }
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10],
                color: '#0A9EBF'
            },
            subheader: {
                fontSize: 12,
                bold: false,
                italics: true,
                alignment: 'justifiy'
            },
            subtitle: {
                fontSize: 16,
                bold: true,
                italics: false,
                alignment: 'left',
                color: '#0A9EBF'
            },
            tableHeader: {
                bold: true,
                fontSize: 16,
                margin: [10, 0, 10, 0]
            }
        }
    };

    // return dd;
    pdfMake.createPdf(dd).download();
}

// export default PDFRecipeCreator
export default pdfmakedownload