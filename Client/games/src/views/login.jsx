import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AutheticationService from '../services/authentication-service';
import { UserConsumer } from '../components/context/user';


class Login extends Component {
    static service = new AutheticationService();

    state = {
        email: '',
        password: '',
        error: '',
    };

    handleChange = ({ target }) => {
        this.setState({
            [target.id]: target.value
        })
    }

    handleSubmit = (event) => {
        const { email, password } = this.state;
        const { updateUser } = this.props;

        event.preventDefault();

        const credentials = {
            email,
            password
        }

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await Login.service.login(credentials);

                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }
                window.localStorage.setItem('auth_token', result.token);
                window.localStorage.setItem('user', JSON.stringify({
                    ...result.user,
                    isLoggedIn: true,
                    isAdmin: result.user.isAdmin
                }));

                updateUser({
                    isLoggedIn: true,
                    isAdmin: result.isAdmin,
                    updateUser: () => (
                        updateUser()
                    ),

                    ...result.user
                });

                return <Redirect to='/' />
            } catch (err) {
                this.setState({
                    error: err.message
                })
            }
        });
    }

    render() {
        const { email, password, error } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    {
                        error.length
                            ? <div>Something went wrong : {error}</div>
                            : null
                    }
                    <h1>Login</h1>
                    <label htmlFor="uname"><b>Email</b></label>
                    <input type="text" name="email" id="email" placeholder="Enter e-mail" value={email} onChange={this.handleChange} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={this.handleChange}  />

                    <button type="submit">Login</button>
                </div>
                <div className="container signin">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        );
    }

}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, updateUser }) => (
                    <Login
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default LoginWithContext;