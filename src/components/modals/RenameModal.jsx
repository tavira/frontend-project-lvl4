import React, { useEffect, useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { selectAddedChannelsNames } from '../channels/channelsSlice';
import { closeModal } from './modalsSlice';
import api from '../../api';

const RenameModal = ({ info }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const addedChannelsNames = useSelector(selectAddedChannelsNames);

  const { id, name } = info;

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      await api.renameChannel(values.name, id);
      resetForm();
      dispatch(closeModal());
    } catch (err) {
      setFieldError('name', err.message);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim()
      .required(t('modals.validation.required'))
      .notOneOf(addedChannelsNames, t('modals.validation.already_exists')),
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit, values, handleChange, errors, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.rename.header')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group>
                <Form.Control
                  data-testid="input-name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              {t('modals.rename.close')}
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {t('modals.rename.save')}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

RenameModal.propTypes = {
  info: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default RenameModal;
