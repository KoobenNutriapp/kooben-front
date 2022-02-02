import React, {useEffect, useState} from 'react';
// import {ImBin2 } from "react-icons/im";
import './UploadImage.scss'

function UploadImage(){

    const [picture, setPicture] = useState([]);
    const [path, setPath] = useState([]);

    
    const onImageChange = (event) => {
        console.log(event)
        console.log(event.target.files)
        setPicture([...event.target.files])
    };


    // useEffect(() => {
    //     if(picture.length < 1) return;
    //     const newImageUrls = [];
    //     // picture.forEach(image => newImageUrls.push(URL.createObjectURL(picture)))
    //     picture.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
    //     setPath(newImageUrls)
    // }, [picture])

    useEffect(() => {
        // if(picture.length < 1) return;
        const newImageUrls = [];
        // picture.forEach(image => newImageUrls.push(URL.createObjectURL(picture)))
        picture.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setPath(newImageUrls)
    }, [picture])
    
    console.log(picture)
    

    return(
        <div className='AddImage-Section'>
            <input type = 'file' accept='image/*' onChange={onImageChange}/>
            {path.map(imageSrc => <img width = '220px' alt = '' src = {imageSrc} />)}
            {/* <ImBin2 onClick={deleteImage()}/> */}

        </div>

    );
};

export default UploadImage;