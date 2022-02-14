import encodeURL from '../services/imageEncoder';

const ddFormater = (data) => {

    const img = encodeURL(data.url)

    const dd = {
        content: [
            {
                text: `${data.title}`,
                style: 'header'
            },
            {   
                // image: `data:image/jpeg;base64,${encodeURL(data.url)}`, option 1
                image: img,
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
                ol: `${data.steps}`
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
};

export default ddFormater;