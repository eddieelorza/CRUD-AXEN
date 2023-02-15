
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function PDFFile() {
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

  return (
    <button 
    className= " btn btn-primary mt-3 "
    onClick={downloadPdf}
    >Imprimir</button> 
  );

  
}

export default PDFFile;