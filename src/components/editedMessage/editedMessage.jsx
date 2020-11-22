import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Col, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { postMessage } from './editedMessageSlice';
import UserContext from '../../contexts/UserContext';


const editedMessage = () => {
  const dispatch = useDispatch();
  const username = useContext(UserContext);
  const [t] = useTranslation();

  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {
    const resultAction = await dispatch(postMessage({ ...values, username }));
    if (postMessage.fulfilled.match(resultAction)) {
      resetForm();
    }
    if (postMessage.rejected.match(resultAction)) {
      setFieldError('message', resultAction.payload);
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
        handleSubmit, values, handleChange, errors,
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

export default editedMessage;
