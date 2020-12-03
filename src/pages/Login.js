import { gql, useMutation } from '@apollo/client'
import React, { useState, useContext } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../hooks/hooks'


const LOGIN_USER = gql`
    mutation login(
        $usernameOrEmail: String!
        $password: String!
    ){
        login(
                usernameOrEmail: $usernameOrEmail
                password: $password
        ){
            id
            username
            email
            createdAt
            token
        }
        
    }
`

const Login = ({ history }) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUserCallback,{
        usernameOrEmail: '',
        password: ''
    })

    const [loginUser,{ loading }] = useMutation(LOGIN_USER, {
        update(_,{ data: { login: userData }}){
            context.login(userData)
            history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    

    function loginUserCallback(){
        loginUser()
    }
    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username or Email"
                    placeholder="Username or Email.."
                    name="usernameOrEmail"
                    value={values.usernameOrEmail}
                    onChange={onChange}
                    error={ errors.usernameOrEmail ? true : false }
                    type="text"
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

export default Login
