

import React,{useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Table from '../components/table/table.js';
import Nabvar from '../components/header/navbar.js';
import PDFFile from '../services/PDFFile.js';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function Home () {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://users-db-55f93-default-rtdb.firebaseio.com/persons/.json')
      .then(response => response.json())
      .then(data => {
        const users = data;
        const usersArray = [];
        for (let id in users) {
          usersArray.push(users[id]);
        }
        setUsers(usersArray);
      });
  }, []);


 
   
  const downloadPdf = () => {
  
    //print table to pdf 
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Lista de Usuarios";
    const headers = [["Nombre", "Apellido", "Email", "Telefono"]];
    const data = users.map(elt=> [elt.name.first, elt.name.last, elt.email, elt.phone]);
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("table.pdf")
  }

  const tableRef = useRef();
    
  
	return (
        <body className= " bg-light ">
            <Nabvar/>
            <main className= " container d-flex flex-column justify-content-center align-items-center ">
                 <Table ref={tableRef}/>
                 <button 
                    className= " btn btn-primary mt-3 "
                    onClick={downloadPdf}
                 >Imprimir</button> 

            </main>
          
         </body>



	);

}

export default Home;