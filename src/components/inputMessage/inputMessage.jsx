import React, { useContext, useRef } from 'react';
import { Formik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/UserContext';
import { apiSendMessage } from '../../api';
import { selectCurrentChannel } from '../channels/channelsSlice';

const inputMessage = () => {
  const username = useContext(UserContext);
  const [t] = useTranslation();
  const { id: currentChannelId } = useSelector(selectCurrentChannel);
  const inputRef = useRef();

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      await apiSendMessage({ ...values, username }, currentChannelId);
      resetForm();
      inputRef.current.focus();
    } catch (err) {
      setFieldError('message', err.message);
    }
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={handleFormSubmit}
      validationSchema={
        Yup.object().shape({
          message: Yup.string().trim().required(t('message.validation.required')),
        })
      }
    >
      { ({
        handleSubmit, values, handleChange, errors, isSubmitting,
      }) => (
        <Form inline onSubmit={handleSubmit} data-testid="messageForm" style={{ width: '100%' }}>
          <Form.Control
            as="input"
            ref={inputRef}
            name="message"
            value={values.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            placeholder={t('message.placeholder')}
            disabled={isSubmitting}
            style={{ flex: '1' }}
          />
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {t('message.send')}
          </Button>
          <Form.Control.Feedback
            type="invalid"
            style={{ display: 'block', height: '1.5rem' }}
          >
            {errors.message}
          </Form.Control.Feedback>
        </Form>
      )}
    </Formik>
  );
};

export default inputMessage;
