import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addChannel as addChannelAction } from './channelsSlice';
import AddModal from '../modals/addModal';

const AddChannel = () => {
  const [t] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button variant="outline-primary" style={{ width: '100%' }} onClick={handleShow}>{t('channels.add.name')}</Button>
      <AddModal show={showModal} handleClose={handleClose} action={addChannelAction} />
    </>
  );
};

export default AddChannel;
