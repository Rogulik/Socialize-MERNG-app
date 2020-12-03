import { gql, useMutation } from '@apollo/client'
import React, { useState, useContext } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../hooks/hooks'

const REGISTER_USER = gql`
    mutation Register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            username
            email
            createdAt
            token
        }
        
    }
`

const Register = ({ history }) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUserCallback,{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser,{ loading }] = useMutation(REGISTER_USER, {
        update(_,{ data:{ register: userData }}){
            context.login(userData)
            history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    

   function registerUserCallback(){
       addUser()
   }
    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    error={ errors.username ? true : false }
                    type="text"
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    error={ errors.email ? true : false }
                    type="email"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    error={ errors.password ? true : false }
                    type='password'
                />
                <Form.Input
                    label="Confirm password"
                    placeholder="Confirm password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={ errors.confirmPassword ? true : false }
                    type='password'
                />
                 <Button type='submit' primary>Submit</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <Message error>
                    <h3>Error</h3>
                    {
                        Object.values(errors).map(value => (
                            <li key={value}>{ value }</li>
                        ))
                    }
                </Message>
                )
            }
        </div>
    )
}

export default Register
