import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Col, Form } from 'react-bootstrap';
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

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      await apiSendMessage({ ...values, username }, currentChannelId);
      resetForm();
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
          message: Yup.string().required(t('message.validation.required')),
        })
      }
    >
      { ({
        handleSubmit, values, handleChange, errors, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} data-testid="messageForm">
          <Form.Row>
            <Form.Group as={Col} lg={12}>
              <Form.Control
                as="input"
                name="message"
                value={values.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                placeholder={t('message.placeholder')}
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default inputMessage;
