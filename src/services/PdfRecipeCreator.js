import {Buffer} from 'buffer';
// import '../img/RuralMexicanKitchen.jpg'
// const kitchenURL = '../img/RuralMexicanKitchen.jpg'


function PDFRecipeCreator(data){

    const steps = data.steps.map((step) => {
        return `${step.text}`
    });

    const URLToBase64 = (imageURL) => {
        const buff = Buffer.from(imageURL, 'utf-8');
        const base64Format = buff.toString('base64');
        return base64Format;
    };



    const dd = {
        content: [
            {
                text: `${data.title}`,
                style: 'header'
            },
            {
                image: `data:image/jpeg;base64,${URLToBase64(data.url)}`,
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

    return dd;
}

export default PDFRecipeCreator