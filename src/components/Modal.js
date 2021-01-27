import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import socket from '../components/Socket'


const ModalSocket = (props) => {

    const { modalIsOpen, setIsOpen, data, setupdate, update, setshow} = props

    // console.log(data)

    const closeModal =() => {
        setIsOpen(false);
    }

    const Delete =()=>{
        let id = data.id;
        socket.emit("delete", id)
        setIsOpen(false);
    }

    const Update =()=>{
        let id = data.id;
        socket.emit("update", id)
        setupdate(!update)
        setshow(true)
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
            <ModalHeader>
                <h1 className="text-center">{ data.nombre}</h1>
            </ModalHeader>
            <ModalBody>
            <div className="d-flex justify-content-between">
                <button className="btn btn-danger" onClick={Delete}>Delete</button>
                <button className="btn btn-warning" onClick={Update}>Update</button>
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
            </ModalBody>
                
            </Modal>
        </div>
    );
   
}

export default ModalSocket;