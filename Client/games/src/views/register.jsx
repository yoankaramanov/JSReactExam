import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import {UserConsumer} from '../components/context/user';



class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            error: ''
        }
    }
    static service = new AuthenticationService();

    handleChange = ({target}) => {
        this.setState({
            [target.id] : target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

       const {username, email, password, } = this.state;

        const credentials = {
            username,
            email,
            password
        }

        const result = await Register.service.register(credentials);

        if (!result.success) {
            this.setState({
                error: Object.values(result.errors).join(', ')
                
            })
            return;
        }

        this.props.history.push('/login')
    }

    render() {
        const { username, email, password, error} = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            this.props.history.push('/login')
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    {
                        error.length
                            ? <div>Something went wrong : {error}</div>
                            : null
                    }
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" name="username" id="username" placeholder="Enter username" value={username} onChange={this.handleChange}  />


                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" id="email" placeholder="Enter e-mail" value={email} onChange={this.handleChange}  />

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={this.handleChange}  />
         
                    <hr />


                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </div>
            </form>
        );
    }
}

const RegisterWithContext = (props) =>{
    return (
        <UserConsumer>
            {
                ({isLoggedIn, updateUser})=>(
                    <Register
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    );
}

export default RegisterWithContext;

