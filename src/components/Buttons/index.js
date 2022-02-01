import { Button } from "reactstrap";
import "./Buttons.scss";


const Buttons = ({children,size,color,callback}) => {
  console.log(callback);
  return (
    <>
      <Button 
        className={color}
        children={children}
        size={size}
        onClick={callback}>
      </Button>
    </>
  )};

export default Buttons;