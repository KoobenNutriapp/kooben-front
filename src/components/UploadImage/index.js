import React, {useEffect, useState} from 'react';
import {CardGroup, Card, Input} from 'reactstrap';
import {ImBin2 } from "react-icons/im";
import './UploadImage.scss'

function UploadImage(){

    const [picture, setPicture] = useState([]);
    const [path, setPath] = useState([]);

    
    const onImageChange = (event) => {
        console.log(event)
        console.log(event.target.files)
        setPicture([...event.target.files])
    };


    const removeImage = () => {
        setPicture([]);
    };

    useEffect(() => {
        const newImageUrls = [];
        picture.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setPath(newImageUrls)
    }, [picture])
    
    console.log(picture)
    

    return(
        <div>
            <h3>Añade una imagen a tu receta</h3>
            <CardGroup className='AddImage-Section'>
                
                <Card className='Search-Delete-Section'>
                    <Input id = 'uploadImage'type = 'file' onChange={onImageChange}/>
                    <div className='Delete-Button-Container'>
                        <ImBin2 onClick={removeImage}/>
                    </div>
                </Card>

                <Card className='Image-Container'>
                    {path.map(imageSrc => <img clasName = 'recipeImage' alt = '' height= "120px" src = {imageSrc} />)}
                </Card>

            </CardGroup>

        </div>

    );
};

export default UploadImage;