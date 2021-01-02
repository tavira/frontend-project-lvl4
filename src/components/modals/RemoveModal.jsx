import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { closeModal } from './modalsSlice';

const RemoveModal = ({ info }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id, name } = info;
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.removeChannel(id);
      dispatch(closeModal());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          {`${t('modals.remove.text')} ${name}?`}
          <div className="invalid-feedback d-block">
            {error}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            {t('modals.remove.close')}
          </Button>
          <Button variant="danger" type="submit" name="remove" onClick={handleClick} disabled={isLoading}>
            {t('modals.remove.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

RemoveModal.propTypes = {
  info: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default RemoveModal;
