import { withFormik } from 'formik'
import React from 'react'

// Components
import { FormError, FormInputContainer, FormLabel } from 'components/Form/Form.s'
import { UserFormErrors, UserFormOwnProps, UserFormValues } from 'components/UserForm/UserForm.h'
import { Button, Input } from 'rebass'

const enhance = withFormik<UserFormOwnProps, UserFormValues>({
  mapPropsToValues: (props) =>
    props.initialValues || {
      gender: '',
      name: '',
      location: {
        street: '',
        city: '',
        state: '',
        postcode: ''
      },
      email: '',
      username: '',
      dob: '',
      phone: '',
      avatarUrl: '',
      level: 0,
      botIds: []
    },

  validate: (values: UserFormValues) => {
    const errors: UserFormErrors = {}
    if (!values.name) {
      errors.name = 'Пожалуйста, введите имя пользователя.'
    }
    if (!values.avatarUrl) {
      errors.avatarUrl = 'Пожалуйста, укажите ссылку на изображение.'
    }
    return errors
  },

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values, bag, bag.props.id)
  },

  displayName: 'UserForm'
})

export const UserForm = enhance((props) => {
  const { handleChange, handleBlur, handleSubmit, values, isSubmitting, touched, errors } = props

  return (
    <form onSubmit={ handleSubmit }>
      <FormLabel mt={ 3 }>
        Имя пользователя:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.name }
            onBlur={ handleBlur }
            name='name'
            id='name'
            placeholder='Имя пользователя'
            w={ 400 }
          />
          { touched.name && errors.name && <FormError>{ errors.name }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <FormLabel mt={ 3 }>
        Ссылка на изображение:
        <FormInputContainer>
          <Input
            onChange={ handleChange }
            value={ values.avatarUrl }
            onBlur={ handleBlur }
            name='avatarUrl'
            id='avatarUrl'
            placeholder='Ссылка на изображение'
            w={ 400 }
          />
          { touched.avatarUrl && errors.avatarUrl && <FormError>{ errors.avatarUrl }</FormError> }
        </FormInputContainer>
      </FormLabel>
      <Button type='submit' mt={ 3 } disabled={ isSubmitting }>
        { props.buttonText }
      </Button>
    </form>
  )
})