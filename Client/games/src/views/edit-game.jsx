import React, { Component,Fragment } from 'react';
import { UserConsumer } from '../components/context/user';
import GameService from '../services/games-service';
import NotFound from '../views/not-found';

class EditGame extends Component {
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


    async componentDidMount() {
        let id = this.props.match.params.id;
        try {

            let game = await EditGame.gameService.getGame(id);

            const { title, description, developer, imageUrl, price, rating, hoursToBeat } = game;

            this.setState({
                id,
                title,
                description,
                developer,
                imageUrl,
                price,
                rating,
                hoursToBeat
            });

        }
        catch (err) {
            return <NotFound />
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.id]: target.value
        })
    }

    handleSubmit = (event) => {
        const { title, description, developer, imageUrl, price, rating, hoursToBeat } = this.state;

        const detailsRoute = `http://localhost:3000/detailsgame/${this.state.id}`;

        event.preventDefault();

        const data = {
            id: this.state.id,
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
                const result = await EditGame.gameService.editGame(data);

                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }

                window.location.href = detailsRoute;

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
            this.props.history.push('/');
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

                        <label htmlFor="hoursToBeat"><b>hoursToBeat</b></label>
                        <input type="text" name="hoursToBeat" id="hoursToBeat" placeholder="Enter hoursToBeat" value={hoursToBeat} onChange={this.handleChange} />
                    </div>
                    <button type="submit">
                        Edit
            </button>
                </form>
            </Fragment>
        );
    }
}

const EditGameWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <EditGame
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default EditGameWithContext