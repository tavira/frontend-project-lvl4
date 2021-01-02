import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddModal from '../modals/AddModal';
import api from '../../api';

const AddChannel = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button variant="outline-primary" className="flex-shrink-1 flex-grow-0 w-100" onClick={handleShow}>
        {t('channels.add.name')}
      </Button>
      <AddModal show={showModal} handleClose={handleClose} action={api.sendChannel} />
    </>
  );
};

export default AddChannel;
