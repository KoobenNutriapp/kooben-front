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


// const tagsArray = ["healthy",
// "prehispanic",
// "low_calories",
// "high_fiber"
// ]

function getTags(Array){
    return Array.map((item) => 
      <Pills children={item} />
    )
} 
  

function RecipeCard({AltImage, SrcImage, RecipeTitle, RecipeDescription, tagsArray}){
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

  <div className='Tags-Section'>
    {getTags(tagsArray)}
  </div>
      {/* <Pills children={'Vegan'} />
      <Pills children={'Prehispanic'} />
      <Pills children={'Low Fat'} />
      <Pills children={'Low Carbs'} /> */}

  
      <CardText className='Card-Text'>
        {RecipeDescription}      
      </CardText>

    </CardBody>
  </Card>
    )
}

export default RecipeCard;