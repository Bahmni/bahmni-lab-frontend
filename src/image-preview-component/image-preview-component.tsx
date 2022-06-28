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
          modalHeading={fileName}
          modalAriaLabel={fileName}
          passiveModal={true}
          open={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <img src={url}></img>
        </Modal>
      </div>
    </>
  )
}
export default ImagePreviewComponent
