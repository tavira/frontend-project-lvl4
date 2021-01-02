import React, { useRef } from 'react';
import {
  Form, Modal, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { selectAddedChannelsNames } from '../channels/channelsSlice';
import { closeModal } from './modalsSlice';

const AddModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const addedChannelsNames = useSelector(selectAddedChannelsNames);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      await api.sendChannel(values);
      resetForm();
      handleClose();
    } catch (e) {
      setFieldError('name', e.message);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim()
      .required(t('modals.validation.required'))
      .notOneOf(addedChannelsNames, t('modals.validation.already_exists')),
  });

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit, values, handleChange, errors, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.add.header')}</Modal.Title>
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
            <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>{t('modals.add.close')}</Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>{t('modals.add.save')}</Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default AddModal;
