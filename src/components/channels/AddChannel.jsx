import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { openModal } from '../modals/modalsSlice';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal({ type: 'adding' }));
  };

  return (
    <Button variant="outline-primary" className="flex-shrink-1 flex-grow-0 w-100" onClick={handleClick}>
      {t('channels.add.name')}
    </Button>
  );
};

export default AddChannel;
