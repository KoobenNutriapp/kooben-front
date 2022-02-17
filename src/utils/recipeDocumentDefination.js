
const ddFormater = (data) => {


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