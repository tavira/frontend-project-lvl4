import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { addChannel as addChannelAction } from './channelsSlice';
import InputModalWindow from '../modals/inputModal';

const AddChannel = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button variant="outline-primary" style={{ width: '100%' }} onClick={handleShow}>Add channel</Button>
      <InputModalWindow show={showModal} handleClose={handleClose} header="Add channel" action={addChannelAction} />
    </>
  );
};

export default AddChannel;
