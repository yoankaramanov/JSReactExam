import React, { Fragment } from 'react';
import GameService from '../services/games-service';
import Game from '../components/game';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        }
    }
    static gameService = new GameService();


    async componentDidMount() {
        let games = await Home.gameService.getGames();
        this.setState({
            games
        })
    }
    render() {
        let { games } = this.state;
        let isLoggedIn = this.props.user.isLoggedIn;
        let isAdmin = this.props.user.isAdmin;
        const backgroundImg = "https://www.setaswall.com/wp-content/uploads/2018/02/Gaming-Wallpaper-11-1920x1080.jpg"

        return (


            isLoggedIn ?
                <Fragment>
                    <h1>All Games</h1>
                    <hr/>
                    <div>
                        {
                            games.length > 0?    
                            games.map(game => <Game key={game.id} game={game} isAdmin={isAdmin}/>)                                           
                            : <h1>No games in database!</h1>
                        }
                    </div>
                </Fragment>
                :
                <img className="backgroundImg" src={backgroundImg} />




        );
    }
}

export default Home;