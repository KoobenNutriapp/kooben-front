import "./Modals.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from "react";

const Modals = ({buttonText,header,body,footerOK, footerNOK,callback}) => {
    // Modal open state
    const [modal, setModal] = useState(false);
    // Toggle for Modal
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button 
          color="info"
          onClick={toggle}>{buttonText}
        </Button>

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader
                toggle={toggle}>{header}</ModalHeader>
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={(event) => {callback();toggle()}}>{footerOK}</Button>
                <Button color="info" onClick={toggle}>{footerNOK}</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
}

export default Modals;
