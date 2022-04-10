import React from 'react';

export default function Paginas({ cantPerPag, cant, setPagina, paginaActual }) {
	const numbers = [];
	for (let i = 0; i < Math.ceil(cant / cantPerPag); i++) {
		numbers.push(i + 1);
	}
	return (
		<nav>
			<ul>
				{numbers.map((number) => {
					return (
						<button
							disabled={number === paginaActual}
							key={number}
							onClick={() => {
								setPagina(number);
							}}
						>
							{number}
						</button>
					);
				})}
			</ul>
		</nav>
	);
}
