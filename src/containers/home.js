

import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Table from '../components/table/table.js';
import Nabvar from '../components/header/navbar.js';
import ReportGenerator from '../services/reportGenerator.js';
import { PDFViewer } from '@react-pdf/renderer';


function Home () {
	return (
        <body >
            <Nabvar/>
            <main className= " container d-flex flex-column justify-content-center align-items-center ">
                 <Table /> 
                <section className="w-100 d-flex flex-row justify-content-start align-items-center my-3 ">
                  <button className="btn btn-primary mx-2">Imprimir</button>
                </section>
            </main>
          
         </body>

	);
}

export default Home;