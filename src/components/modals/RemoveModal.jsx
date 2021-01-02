import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RemoveModal = ({
  info, hideModal, action,
}) => {
  const { t } = useTranslation();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id, name } = info;
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await action(id);
      hideModal();
    } catch (err) {
      setError(err.message);
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
