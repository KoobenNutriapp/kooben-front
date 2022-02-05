import { Badge } from "reactstrap";
import "./Pills.scss";


const Pills = ({children,color="success",pill}) => {
  return (
    <>
      <Badge 
        children={children}
        color={color}
        pill={pill}>
      </Badge>
    </>
  )};

export default Pills;