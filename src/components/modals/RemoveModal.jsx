import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const RemoveModal = ({
  info, hideModal, action,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id, name } = info;
  const handleClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const resultAction = await dispatch(action(id));
    if (action.fulfilled.match(resultAction)) {
      hideModal();
    }
    if (action.rejected.match(resultAction)) {
      setError(resultAction.payload);
    }
  };

  return (
    <Modal show onHide={hideModal}>
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
          <Button variant="secondary" onClick={hideModal} disabled={isLoading}>
            {t('modals.remove.close')}
          </Button>
          <Button variant="danger" type="submit" name="remove" onClick={handleClick} disabled={isLoading}>
            {t('modals.remove.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

RemoveModal.propTypes = {
  info: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
  }).isRequired,
  hideModal: propTypes.func.isRequired,
  action: propTypes.func.isRequired,
};

export default RemoveModal;
