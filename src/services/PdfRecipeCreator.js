function PDFRecipeCreator(data){

    // const ingredients = data.

    const steps = data.steps.map((step) => {
        return `${step.text}`
    })


    const dd = {
        content: [
            {
                text: `${data.title}`,
                style: 'header'
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

    return dd;
}

export default PDFRecipeCreator