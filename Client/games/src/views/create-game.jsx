import React, { Component, Fragment, } from 'react';
import { UserConsumer } from '../components/context/user';
import GameService from '../services/games-service';
import {Redirect} from 'react-router-dom';


class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            title: '',
            description: '',
            developer: '',
            imageUrl: '',
            price: '',
            rating: '',
            hoursToBeat: '',

        }
    }
    static gameService = new GameService();


    handleChange = ({ target }) => {
        this.setState({
            [target.id]: target.value
        })
    }

    handleSubmit = (event) => {
        const { title, description, developer, imageUrl, price, rating, hoursToBeat } = this.state;

        event.preventDefault();

        const data = {
            title,
            description,
            developer,
            imageUrl,
            price,
            rating,
            hoursToBeat
        }

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await CreateGame.gameService.createGame(data);

                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }

                this.props.history.push('/');

            } catch (err) {
                this.setState({
                    error: err.message
                })
            }
        });
    }

    render() {
        const { isLoggedIn, isAdmin } = this.props;

        const { error, title, description, developer, imageUrl, price, rating, hoursToBeat } = this.state;

        if (!isLoggedIn || !isAdmin) {
            return <Redirect to='/'/>
        }

        return (
            <Fragment>
                <h1>Create game</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    <div className="container">
                        {
                            error.length
                                ? <div>Something went wrong : {error}</div>
                                : null
                        }

                        <label htmlFor="title"><b>Title</b></label>
                        <input type="text" name="title" id="title" placeholder="Enter title" value={title} onChange={this.handleChange} />

                        <label htmlFor="description"><b>Description</b></label>
                        <input type="text" name="description" id="description" placeholder="Enter description" value={description} onChange={this.handleChange} />

                        <label htmlFor="developer"><b>Developer</b></label>
                        <input type="text" name="developer" id="developer" placeholder="Enter developer" value={developer} onChange={this.handleChange} />

                        <label htmlFor="imageUrl"><b>Image URL</b></label>
                        <input type="text" name="imageUrl" id="imageUrl" placeholder="Enter imageUrl" value={imageUrl} onChange={this.handleChange} />

                        
                        <label htmlFor="price"><b>Price</b></label>
                        <input type="text" name="price" id="price" placeholder="Enter price" value={price} onChange={this.handleChange} />

                        <label htmlFor="rating"><b>Rating</b></label>
                        <input type="text" name="rating" id="rating" placeholder="Enter rating" value={rating} onChange={this.handleChange} />

                        <label htmlFor="hoursToBeat"><b>Hours To Beat</b></label>
                        <input type="text" name="hoursToBeat" id="hoursToBeat" placeholder="Enter hours to beat" value={hoursToBeat} onChange={this.handleChange} />
                    </div>
                    <button type="submit">
                        Create
            </button>
                </form>
            </Fragment>

        );
    }
}

const CreateGameWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <CreateGame
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default CreateGameWithContext