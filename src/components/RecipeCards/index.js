import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';
import LikesCounter from '../LikesCounter';
import Pills from '../Pills';

import './RecipeCards.scss'

function RecipeCard({AltImage, SrcImage, RecipeTitle, RecipeDescription}){
    return(
    <Card className='Recipe-Card'>
    <CardImg

      alt={AltImage}

      src={SrcImage}
      top
      className='Card-Image'
    />
    <CardBody className='Card-Body'>
  
      <CardTitle tag="h4" className='Card-Title'>
        {RecipeTitle}
        {/* <div className='col-md-5 Title-Container'> */}
        
        {/* </div>
        <div className='col-md-4'>
        </div> */}

      <LikesCounter />
      </CardTitle>
      <Pills children={'Vegan'} />
      <Pills children={'Prehispanic'} />
      <Pills children={'Low Fat'} />
      <Pills children={'Low Carbs'} />

  
      <CardText className='Card-Text'>
        {RecipeDescription}      
      </CardText>

    </CardBody>
  </Card>
    )
}

export default RecipeCard;