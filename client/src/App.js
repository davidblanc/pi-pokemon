import './App.css';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';  // v6 se cambiar Switch por Routes
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetail';
import PokemonForm from './components/PokemonForm';
// import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/pokemons' component={Home} />
          <Route exact path='/create' component={PokemonForm}/>
          <Route path='/pokemons/:id' component={PokemonDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
