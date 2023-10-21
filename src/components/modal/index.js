import ReactModal from "react-modal";
import cn from "classnames";

const Modal = ({ toggle, isOpen, className, children, props }) => {
  return (
    <ReactModal
      className={cn(className)}
      isOpen={isOpen}
      onRequestClose={toggle}
      contentLabel="Example Modal"
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
