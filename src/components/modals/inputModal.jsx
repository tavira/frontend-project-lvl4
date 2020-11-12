import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';

const InputModalWindow = ({
  show, handleClose, header, action,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    const resultAction = await dispatch(action({ ...values }));
    if (action.fulfilled.match(resultAction)) {
      resetForm();
      handleClose();
    }
    if (action.rejected.match(resultAction)) {
      setFieldError('data', resultAction.payload);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={handleFormSubmit}
        validationSchema={
          Yup.object().shape({
            name: Yup.string().required('required'),
          })
        }
      >
        {({
          handleSubmit, values, handleChange, errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Row>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

InputModalWindow.propTypes = {
  show: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  header: propTypes.string.isRequired,
  action: propTypes.func.isRequired,
};

export default InputModalWindow;
