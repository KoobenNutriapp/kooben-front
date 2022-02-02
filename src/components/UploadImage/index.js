import React, {useEffect, useState} from 'react';

function UploadImage(){

    const [picture, setPicture] = useState([]);
    const [path, setPath] = useState([]);

    
    const onImageChange = (event) => {
        setPicture([...event.target.files])
    }
    
    // console.log(...picture)
    // // console.log()
    useEffect(() => {
        if(picture.length < 1) return;
        const newImageUrls = [];
        picture.forEach(image => newImageUrls.push(URL.createObjectURL(picture)))
        setPath(newImageUrls)
    }, [picture])
    
    

    return(
        <div>
            <input type = 'file' accept='image/*' onChange={onImageChange}/>
            {path.map(imageSrc => <img alt = '' src = {imageSrc} />)}
        </div>

    );
};

export default UploadImage;