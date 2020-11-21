import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';


const RemoveModal = ({
  info, hideModal, action,
}) => {
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const { id, name } = info;
  const handleClick = async (e) => {
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
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          {`Are you sure you want to delete channel ${name}?`}
          <div className="invalid-feedback" style={{ display: 'block' }}>
            {error}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Close</Button>
          <Button variant="danger" type="submit" name="remove" onClick={handleClick}>Remove</Button>
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
  action: propTypes.func.isRequired,
};

export default RemoveModal;
