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

function RecipeCard(){
    return(
    <Card className='Recipe-Card'>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/256/186"
      top
    //   width="50%"
    //   height="30%"
      className='Card-Image'
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      {/* <Button>
        Button
      </Button> */}
    </CardBody>
  </Card>
    )
}

export default RecipeCard;