import React, { Fragment } from 'react';
import { UserConsumer } from '../components/context/user';


const Header = ({ isLoggedIn, isAdmin, username, logout }) => {
	let NavBar = '';
	if (isAdmin) {
		NavBar =
			<Fragment>
				<ul>
					<li className="title">GAME STATS</li>
					<li><a href="/">Home</a></li>
					<li><a href="/creategame">Create Game</a></li>
					<li className="flr"><a href="#" onClick={logout}>Logout</a></li>
					<span className="flrgreet">Hello, {username}</span>

				</ul>
			</Fragment>
	}
	else if (isLoggedIn) {
		NavBar = <Fragment>
			<ul>
				<li className="title">GAME STATS</li>
				<li><a href="/">Home</a></li>
				<li className="flr"><a href="#" onClick={logout}>Logout</a></li>
				<span className="flrgreet">Hello, {username}</span>
			</ul>
		</Fragment>
	}
	else {
		NavBar =
			<Fragment>
				<ul>
					<li className="title">GAME STATS</li>
					<li><a href="/">Home</a></li>
					<li className="flr"><a href="/register">Register</a></li>
					<li className="flr"><a href="/login">Login</a></li>


				</ul>

			</Fragment>
	}

	return (


		<Fragment>
			{NavBar}
		</Fragment>



	);
}

const HeaderWithContext = (props) => {
	return (
		<UserConsumer>
			{
				({ isLoggedIn, isAdmin, username }) => (
					<Header
						{...props}
						isLoggedIn={isLoggedIn}
						isAdmin={isAdmin}
						username={username}
					/>
				)
			}
		</UserConsumer>)

}

export default HeaderWithContext;

