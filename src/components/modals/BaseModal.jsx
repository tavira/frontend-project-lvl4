import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import AddModal from './AddModal';
import RenameModal from './RenameModal';
import RemoveModal from './RemoveModal';
import { closeModal } from './modalsSlice';

const BaseModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.modals);

  if (state.uiState !== 'opened') {
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const renderModalByType = () => {
    switch (state.type) {
      case 'adding':
        return <AddModal />;
      case 'renaming':
        return <RenameModal info={state.context} />;
      case 'removing':
        return <RemoveModal info={state.context} />;
      default:
        return new Error('unknown state of modal type has been passed');
    }
  };

  return (
    <Modal show onHide={handleClose}>
      {renderModalByType()}
    </Modal>
  );
};

export default BaseModal;
