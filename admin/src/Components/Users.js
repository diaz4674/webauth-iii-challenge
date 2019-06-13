import React from 'react'
import withAuth from '../helpers/auth'
import api from '../helpers/api'

class Users extends React.Component {
    state = {
        users: []
    }

async componentDidMount(){
    try {
        const results = await api.get('/users')
        this.setState({
            users: results.data
        })
        console.log(results)
    } catch(err) {
        console.log(err)
    }
} 
render() {
    console.log(this.state.users)
    return (
        <>
            <h3>Users</h3>

            <ul>
                {this.state.users.map((user, i) => {
                    return (
                        <div key = {i}>
                            <h2>{user.username}</h2>
                            <p>{user.department}</p>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}
}

export default withAuth(Users)