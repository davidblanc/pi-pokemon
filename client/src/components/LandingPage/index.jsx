import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import img from '../../images/pokelogo.png';

export default function LandingPage() {
	return (
		<div className="backLanding">
			<div className="over">
	
				<Link to="/pokemons">
					{/* <button className="button">Ingresar</button> */}
					<div className="imagePoke">
						<img src={img} alt="" />
					</div>
				</Link>
			</div>
		</div>
	);
}
