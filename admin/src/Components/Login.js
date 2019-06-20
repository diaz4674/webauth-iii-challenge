import React from 'react'
import {withRouter} from 'react-router-dom'
import api from '../helpers/api'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const {username, password} = this.state

            const result = await api.post('/login', {
                username,
                password,
            })
            localStorage.setItem('token', result.data.token)
            this.props.history.push('/users')
        } catch(err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <>
                <h2>Login</h2>
                <form onSubmit = {this.handleSubmit}>
                    <input type = 'text' name = 'username' onChange = {this.handleChange} placeholder = 'Username' value = {this.state.username} />
                    <input type = 'password' name = 'password' onChange = {this.handleChange} placeholder = 'Password' value = {this.state.password} />
                    <button type = 'submit'>Login</button>
                </form>

            </>
        )
    }
}

export default withRouter(Login)