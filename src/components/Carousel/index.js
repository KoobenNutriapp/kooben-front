import { UncontrolledCarousel } from 'reactstrap';
import "./Carousel.scss";

const Carousel = () => {

  return (
  <>
      <UncontrolledCarousel
          items={[
            {
              altText: 'elote preparado',
              //caption: 'Slide 1',
              key: 1,
              src: 'https://kooben.s3.amazonaws.com/images/home-images/corn.jpg'
            },
            {
              altText: 'mertcado',
              //caption: 'Slide 2',
              key: 2,
              src: 'https://kooben.s3.amazonaws.com/images/home-images/market.jpg'
            },
            {
              altText: 'recetas prehispánicas',
              //caption: 'Slide 3',
              key: 3,
              src: 'https://kooben.s3.amazonaws.com/images/home-images/recipes.jpg'
            },
            {
              altText: 'salsa mexicana',
              //caption: 'Slide 3',
              key: 4,
              src: 'https://kooben.s3.amazonaws.com/images/home-images/salsa.jpg'
            },
            {
              altText: 'marchanta',
              //caption: 'Slide 3',
              key: 5,
              src: 'https://kooben.s3.amazonaws.com/images/home-images/seller.jpg'
            }
          ]}
      />

  </>
)};

export default Carousel;
