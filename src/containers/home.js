

import React,{useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Table from '../components/table/table.js';
import Nabvar from '../components/header/navbar.js';
import PDFFile from '../services/PDFFile.js';
import 'jspdf-autotable'

function Home () {
	return (
        <section className= "container_principal">
            <Nabvar/>
            <div className= " container d-flex flex-column justify-content-center align-items-center ">
                 <Table/>
                  <PDFFile/>
            </div>
         </section>
	);

}

export default Home;