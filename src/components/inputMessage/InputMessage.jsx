import React, { useContext, useRef } from 'react';
import { Formik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/UserContext';
import api from '../../api';
import { selectCurrentChannel } from '../channels/channelsSlice';

const InputMessage = () => {
  const username = useContext(UserContext);
  const { t } = useTranslation();
  const { id: currentChannelId } = useSelector(selectCurrentChannel);
  const inputRef = useRef();

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      await api.sendMessage({ ...values, username }, currentChannelId);
      resetForm();
      inputRef.current.focus();
    } catch (err) {
      setFieldError('message', err.message);
    }
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().trim().required(t('message.validation.required')),
  });

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      { ({
        handleSubmit, values, handleChange, errors, isSubmitting,
      }) => (
        <Form inline onSubmit={handleSubmit} data-testid="messageForm" className="w-100">
          <Form.Control
            as="input"
            className="d-flex flex-grow-1"
            ref={inputRef}
            name="message"
            value={values.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            placeholder={t('message.placeholder')}
            disabled={isSubmitting}
          />
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {t('message.send')}
          </Button>
          <Form.Control.Feedback
            type="invalid"
          >
            {errors.message}
          </Form.Control.Feedback>
        </Form>
      )}
    </Formik>
  );
};

export default InputMessage;
