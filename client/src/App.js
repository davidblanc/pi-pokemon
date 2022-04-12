import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // v6 se cambiar Switch por Routes
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetail';
import PokemonForm from './components/PokemonForm';
import NavBar from './components/NavBar';

function App() {
	return (
		<div className="App">
			<Router>
				<Route exact path="/" component={LandingPage} />
				<Route path="/pokemons" component={NavBar} />
				<Route exact path="/pokemons" component={Home} />
				<Switch>
					<Route exact path="/pokemons/create" component={PokemonForm} />
					<Route exact path="/pokemons/:id" component={PokemonDetail} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
