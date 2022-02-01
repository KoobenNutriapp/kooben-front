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
  <div  className='Title-Likes-Container'>
    <div className='Title-Container col-lg-10 col-m-6'>
    <CardTitle tag="h4" className='Card-Title'>
        {RecipeTitle}
    </CardTitle>
    </div>
    <div className='Likes-Counter-Container'>
    <LikesCounter />
    </div>
  </div>

        {/* <div className='col-md-5 Title-Container'> */}
        
        {/* </div>
        <div className='col-md-4'>
        </div> */}
      
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