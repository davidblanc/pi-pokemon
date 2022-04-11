import { render, screen } from '@testing-library/react';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import App from './App';

describe('<App />', () => {
  let store;
  const routes = ["/", "/otraRuta", "/houses", "/houses/:1", "/house/create"];
  const mockStore = configureStore([thunk]);


  it('El componente "Houses" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Houses)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });


	test('Hay una ruta home', () => {
		render(<App />);
		const linkElement = screen.getByText(/asd/i);
		expect(linkElement).toBeInTheDocument();
	});



});
