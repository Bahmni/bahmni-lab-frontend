import React, {useState} from 'react'
import {ComposedModal, Link} from 'carbon-components-react'

const Images = ({url, fileName}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Link onClick={() => setShowModal(true)}>{fileName}</Link>
      <div>
        <ComposedModal open={showModal} onClose={() => setShowModal(false)}>
          <img src={url}></img>
        </ComposedModal>
      </div>
    </>
  )
}
export default Images
