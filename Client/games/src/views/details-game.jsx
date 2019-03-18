import React, { Component, Fragment } from 'react';
import { UserConsumer } from '../components/context/user';
import GameService from '../services/games-service';
import NotFound from '../views/not-found';

class DetailsGame extends Component {
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

            let game = await DetailsGame.gameService.getGame(id);

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




    render() {
        const { isAdmin } = this.props;

        const { title, description, developer, imageUrl, price, rating, hoursToBeat } = this.state;

        const homeRoute = "http://localhost:3000/";
       
        const editRoute = `http://localhost:3000/editgame/${this.props.match.params.id}`;
        return (
            <Fragment>
                <div className="details">
                    <h2>Detials for: <strong>{title}</strong></h2>
                    <img src={imageUrl} height="100%" width="100%" />
                    <h4><strong>Description</strong>: {description}</h4>
                    <h4><strong>Developer</strong>: {developer}</h4>
                    <h4><strong>Price</strong>: ${price}</h4>
                    <h4><strong>Rating</strong>: {rating}/10</h4>
                    <h4><strong>Hours to beat</strong>: {hoursToBeat} hrs.</h4>
                    <span  >
                        <button className="greenBtn" onClick={() => window.location.href = homeRoute}>Return Home</button>
                    </span>
                    {
                        isAdmin ?
                            <span  >
                                <button className="yellowBtn" onClick={() => window.location.href = editRoute}>Edit</button>
                            </span>
                            : null
                    }

                </div>

            </Fragment>
        );
    }
}

const DetailsGameWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <DetailsGame
                        {...props}
                        isLoggedIn={isLoggedIn}
                        isAdmin={isAdmin}
                    />
                )
            }
        </UserConsumer>
    );
}

export default DetailsGameWithContext