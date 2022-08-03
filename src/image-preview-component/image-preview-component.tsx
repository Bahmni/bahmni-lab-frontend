import React, {useState} from 'react'
import {Modal, Button} from 'carbon-components-react'
import classes from './image-preview-component.scss'

const ImagePreviewComponent = ({url, fileName}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        className={classes.imageLabel}
        role="button"
        kind="ghost"
        onClick={() => {
          setShowModal(true)
        }}
      >
        {fileName}
      </Button>
      <div>
        <Modal
          className={classes.modal}
          modalHeading={fileName}
          modalAriaLabel={fileName}
          passiveModal={true}
          open={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <div className={classes.imageContainer}>
            <img className={classes.image} src={url} alt={fileName}></img>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default ImagePreviewComponent
