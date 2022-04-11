// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Home/i);
//   expect(linkElement).toBeInTheDocument();
// });
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import * as data from "./dato.test.json";
import LandingPage from "../src/components/LandingPage";
import Home from "../src/components/Home";
import PokemonForm from "../src/components/PokemonForm";
import PokemonDetail from "../src/components/PokemonDetail";


configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/otraRuta", "/houses", "/houses/:1", "/house/create"];
  const mockStore = configureStore([thunk]);
  const state = {
    houses: data.houses,
    house: data.houses[0],
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };



  it('El componente "Landing" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(LandingPage)).toHaveLength(1);

  });

  it('El componente "HouseDetail" se debería renderizar solamente en la ruta "/houses/:houseId"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(HouseDetail)).toHaveLength(1);
    expect(app.find(Houses)).toHaveLength(0);
    expect(app.find(Nav)).toHaveLength(1);
  });

  it('El componente "CreateHouse" se debería renderizar solamente en la ruta "/house/create"', () => {
    const app = mount(componentToUse(routes[4]));
    expect(app.find(CreateHouse)).toHaveLength(1);
    expect(app.find(Houses)).toHaveLength(0);
    expect(app.find(Nav)).toHaveLength(1);
  });
});
