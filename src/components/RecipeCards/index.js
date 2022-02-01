import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
} from 'reactstrap';

import './RecipeCards.scss'

function RecipeCard({AltImage, SrcImage, RecipeTitle, RecipeDescription}){
    return(
    <Card className='Recipe-Card'>
    <CardImg
      // alt="Card image cap"
      alt={AltImage}
      // src="https://picsum.photos/256/186"
      src={SrcImage}
      top
      className='Card-Image'
    />
    <CardBody className='Card-Body'>
      <CardTitle tag="h3" className='Card-Title'>
        {/* Ensalada de nopales */}
        {RecipeTitle}
      </CardTitle>
      <CardText className='Card-Text'>
        {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
        {RecipeDescription}      
      </CardText>
      {/* <Button>
        Button
      </Button> */}
    </CardBody>
  </Card>
    )
}

export default RecipeCard;