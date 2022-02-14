const encodeURL = (imageURL) => {

    const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));
    
    let img = ''
    console.log('por entrar')
    toDataURL(imageURL)
    .then(dataURL => {
        console.log('imprimiendo')
        console.log('RESULT', dataURL)
        img = dataURL
    });

    return (
        img
    )
};

export default encodeURL;