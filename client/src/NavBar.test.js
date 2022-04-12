import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Nav from "./components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<Nav />);

  });

  it('Debería renderizar dos <NavLink to="" />. El primero que vaya a "/pokemons", y el segundo a "/create"', () => {

    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(2);
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/pokemons"', () => {

    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/pokemons");
    expect(nav.find(NavLink).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Crear Pokemon" y que cambie la ruta hacia "/create"', () => {
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/pokemons/create");
    expect(nav.find(NavLink).at(1).text()).toEqual("Crear Pokemon");
  });
});