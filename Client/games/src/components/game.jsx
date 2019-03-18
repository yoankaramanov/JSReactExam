import React, { Component, Fragment } from 'react';
import GameService from '../services/games-service';


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDetails: false,
            selectedGame: {}
        }
    }

    
    static gameService = new GameService();

    delete(game) {
        Game.gameService.deleteGame(game._id)
            .then(window.location.href = "http://localhost:3000/");

    }



    collapse() {
        this.setState({
            displayDetails: false,
            selectedGame: {},
        })
    }

    details(game) {
        this.setState({
            displayDetails: true,
            selectedGame: game,
        })
    }



    render() {
        let { game, isAdmin } = this.props;

        const editRoute = `http://localhost:3000/editgame/${game._id}`;
        const detailsRoute = `http://localhost:3000/detailsgame/${game._id}`;

        return (


            <div>

                {

                    this.state.displayDetails ?
                        <div className="center">
                            <h2>{this.state.selectedGame.title}</h2>
                            <img className="gameCardImg" src={this.state.selectedGame.imageUrl} />
                            <h4><strong>Description</strong>: {this.state.selectedGame.description.substr(0, 200)}...</h4>
                            <span  >
                                <button className="blueBtn" onClick={() => window.location.href = detailsRoute}>Details</button>
                            </span>

                            {isAdmin ?
                                <Fragment>
                                    <span  >
                                        <button className="redBtn" onClick={() => this.delete(game)}>Delete</button>
                                    </span>

                                    <span  >
                                        <button className="yellowBtn" onClick={() => window.location.href = editRoute}>Edit</button>
                                    </span>

                                </Fragment>



                                : null
                            }
                            <span>
                                <button className="greyBtn" onClick={() => this.collapse()}>Collapse</button>
                            </span>
                            <hr />
                        </div>
                        :
                        <div className="center">

                            <h2>{game.title}</h2>
                            <img className="gameCardImg" src={game.imageUrl} />

                            <span >
                                <button className="greyBtn" onClick={() => this.details(game)}>More</button>
                            </span>

                            <hr />
                        </div>



                }
            </div>



        )
    }
}



export default Game