import React, { useState, useEffect, useCallback } from "react";
import usersApi from '../../api/users'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function Table() {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [usersList, setUsersList] = useState({});
      const [userName, setUserName] = useState("Israel");
      const [userLastName, setUserLastName] = useState("Salinas Martínez");
      const [userEmail, setUserEmail] = useState("israel@kodemia.mx");
      const [userPicture, setUserPicture] = useState("https://randomuser.me/api/portraits/men/93.jpg");
      const [userId, setUserId] = useState(123456);
      const [userPhone, setUserPhone] = useState(12345632121);
      const [isLoading, setIsLoading] = useState(false);

      const getData = useCallback(async () => {
        const data = await usersApi.getUsers();
        setUsersList(data);
        setIsLoading(false);
      }, []);
      const postUser = useCallback(async (user) => {
        const data = await usersApi.storeUser(user);
        setUsersList(data);
      }, []);
    
      const saveUser = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        setTimeout(function () {
          const userObject = {
            email: userEmail,
            name: { first: userName, last: userLastName },
            picture:userPicture ,
            phone: userPhone,
            id: userId

          };
          postUser(userObject);
          getData();
        }, 5000);
      };
    

      const deleteUser = useCallback(async (userKey) => {
        console.log(userKey);
        await usersApi.deleteUser(userKey);
        getData();
      }, []);


      useEffect(() => {
        getData();
      }, []);

      const [showUpdate, setShowUpdate] = useState(false);
      const handleCloseUpdate = () => setShowUpdate(false);
      const handleShowUpdate = () => setShowUpdate(true);
      const [userKey, setUserKey] = useState("");
      const [userEmailUpdate, setUserEmailUpdate] = useState("");
      const [userNameUpdate, setUserNameUpdate] = useState("");
      const [userLastNameUpdate, setUserLastNameUpdate] = useState("");
      const [userPictureUpdate, setUserPictureUpdate] = useState("");
      const [userPhoneUpdate, setUserPhoneUpdate] = useState("");
      const [userIdUpdate, setUserIdUpdate] = useState("");

      const updateUser = useCallback(async (update) => {
        await usersApi.updateUser(update);
        getData();
      }, []);

      const saveUpdate = async (event) => {
        event.preventDefault();
        const updateObject = {
          [userKey]: {
            email: userEmailUpdate,
            name: { first: userNameUpdate, last: userLastNameUpdate },
            picture:userPictureUpdate ,
            phone: userPhoneUpdate,
            id: userIdUpdate

          }
        };
        updateUser(updateObject);
        handleCloseUpdate();
      };

      const handleUpdate = (userKey, user) => {
        setUserKey(userKey);
        setUserEmailUpdate(user.email);
        setUserNameUpdate(user.name.first);
        setUserLastNameUpdate(user.name.last);
        setUserPictureUpdate(user.picture);
        setUserPhoneUpdate(user.phone);
        setUserIdUpdate(user.id);
        handleShowUpdate();
      };

      

    return (
    <>
      <section className="w-100 d-flex flex-row justify-content-between align-items-center my-3 ">
        <span className="d-flex flex-row justify-content-between align-items-center">
            <h2 className="fw-bold">DIRECTORIO</h2>
            {/* <Form className="d-flex ms-3">
            <Form.Control
            onChange={handleSearch}
            value={search}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
            </Form> */}
        </span>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      </section>
    <section className="overflow-scroll w-100">
      <table className="crud_table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th></th>
        </tr>
      </thead>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center">
          <div class="spinner-border text-primary"></div>
        </section>
        
      ) : (
        <>
          <tbody>
            {usersList &&
              Object.keys(usersList).map((key, index) => {
                const { email, phone, picture, name, id } = usersList[
                  key
                ];
                return (
                  <tr key={key}>
                  <td>{id}</td>
                  <td><img className="rounded-circle" src={picture} alt=""/></td>
                  <td>{name?.first}</td>
                  <td>{name?.last}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td className="btns">
                    <button 
                    onClick={() => {
                      deleteUser(key);
                    }}
                    className="btn btn-danger mx-2">Borrar</button>
                    <button
                    onClick={() => {
                      handleUpdate(key, usersList[key]);

                    }}
                    className="btn btn-warning">Editar</button>

                  </td>
                  </tr>
                );
              })}
          </tbody>
        </>
      )}
      </table>  
    </section>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>URL AVATAR</Form.Label>
              <Form.Control
                name="picture"
                onChange={(event) => {
                  setUserPicture(event.target.value);
                }}
                value={userPicture}
                type="text"
                placeholder="url"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="id"
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
                value={userId}
                type="text"
                placeholder="123322"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                value={userName}
                type="text"
                placeholder="Eddie"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last"
                onChange={(event) => {
                  setUserLastName(event.target.value);
                }}
                value={userLastName}
                type="text"
                placeholder="Elorza"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
                value={userEmail}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                onChange={(event) => {
                  setUserPhone(event.target.value);
                }}
                value={userPhone}
                type="text"
                placeholder="1234567890"
                autoFocus
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveUser}>
            Agregar Usuario
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>URL AVATAR</Form.Label> 
              <Form.Control
                name="picture"
                onChange={(event) => {
                  setUserPictureUpdate(event.target.value);
                }}
                value={userPictureUpdate}
                type="text"
                placeholder="url"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="id"
                onChange={(event) => {
                  setUserIdUpdate(event.target.value);
                }}
                value={userIdUpdate}
                type="text"
                placeholder="123322"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="name"
                onChange={(event) => {
                  setUserNameUpdate(event.target.value);
                }}
                value={userNameUpdate}
                type="text"
                placeholder="Eddie"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last"
                onChange={(event) => {
                  setUserLastNameUpdate(event.target.value);
                }}
                value={userLastNameUpdate}
                type="text"
                placeholder="Elorza"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={(event) => {
                  setUserEmailUpdate(event.target.value);
                }}
                value={userEmailUpdate}
                type="email"
                placeholder="edd.elorza@gmail.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                onChange={(event) => {
                  setUserPhoneUpdate(event.target.value);
                }}
                value={userPhoneUpdate}
                type="text"
                placeholder="1234567890"
                autoFocus
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveUpdate}>
            Actualizar Usuario
          </Button>
        </Modal.Footer>
      </Modal>

    </>
    
  
    );

    
}

export default Table;