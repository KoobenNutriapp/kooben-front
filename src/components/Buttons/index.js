import { Button } from "reactstrap";
import "./Buttons.scss";

const Buttons = ({ children, size, color }) => {
  return (
    <>
      <Button className={color} children={children} size={size}></Button>
    </>
  );
};

export default Buttons;
