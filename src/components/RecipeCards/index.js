import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pills from '../Pills';
import './RecipeCards.scss'


function getTags(Array){
    return Array.map((item, index) => 
      <Pills key={`Tag${index}`} children={item} />
    )
} 


function RecipeCards({AltImage, SrcImage, RecipeTitle, RecipeDescription, tagsArray}) {
  return (
    <Card sx={{ maxWidth: 680 }} sy={{minHeight: 400 }} className='FullCard'>
      <CardMedia
        component="img"
        height="200"
        image={SrcImage}
        alt={AltImage}
      />
      <CardContent className = 'CardContent-Section'>

            <Typography gutterBottom variant="h6" component="div" className='Typography' >
            {RecipeTitle}
            </Typography>

        <div className='Tags-Section'>
            {getTags(tagsArray)}
        </div>
        <Typography variant="body2" color="text.secondary">
          {RecipeDescription}
        </Typography>
      </CardContent>
      <CardActions>

        <Button size="small">Leer más</Button>
      </CardActions>
    </Card>
  );
  }

  export default RecipeCards