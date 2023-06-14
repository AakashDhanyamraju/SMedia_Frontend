import React from 'react'

const Modal = (title, message) => {
    const [open, setOpen] = React.useState(true);
    // handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
        <Modal backdrop='false' keyboard={false} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            {/* <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button> */}
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Modal