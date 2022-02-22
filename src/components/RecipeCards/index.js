import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pills from '../Pills';
import './RecipeCards.scss'
import {useNavigate} from 'react-router-dom';

function getTags(Array) {
  return Array.map((item, index) => (
    <Pills key={`Tag${index}`} children={item} pill={true} />
  ));
}

function RecipeCards({
  Recipekey,
  AltImage,
  SrcImage,
  RecipeTitle,
  RecipeDescription,
  tagsArray,
  metaData,
}) {
  const navigate = useNavigate();

  const toDetailRecipe = (recipe) => {
    console.log('navigate to deatil recipe')
    navigate(`/DetailRecipe/:${recipe.Recipekey}`, { state: { recipe } });
  };

  return (
    <Card sx={{ maxWidth: 680 }} sy={{ height: 600 }} className="FullCard">
      <CardMedia component="img" height="300" image={SrcImage} alt={AltImage} />
      <CardContent className="CardContent-Section">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="Typography"
        >
          <a
            onClick={() => {
              toDetailRecipe({ Recipekey, metaData });
            }}
          >
            {RecipeTitle}
          </a>
        </Typography>
        <div className="Tags-Section">{getTags(tagsArray)}</div>
        <Typography
          variant="body2"
          color="text.secondary"
          className="Recipe-Description"
        >
          {RecipeDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeCards;
