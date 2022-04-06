import React from "react";
import { useState } from 'react';

export default function Paginas({ cantPerPag, cant, setPagina, paginaActual }) {
    const [pageActual, setPageActual] = useState(paginaActual);
    const numbers = [];
    for (let i = 0; i < Math.ceil(cant / cantPerPag); i++) {
        numbers.push(i + 1);
    }
    return (
        <nav>
            <ul>
                {
                    numbers.map(number => {
                        return (
                            <button disabled={number===pageActual} key={number} onClick={() => {
                                
                                setPagina(number)
                                setPageActual(number)
                            }}>{number}
                            </button>
                        )
                    })
                }
            </ul>
        </nav>
    )
}