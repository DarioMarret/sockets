import React, {useState, useEffect} from 'react'
import ModalSocket from '../components/Modal'
import socket from '../components/Socket';

const NuevoUsuario = (props) => {
    
    const { setApellido, setNombre, setContraceña, SaveUser, user, Nombre, Apellido, Contraceña, update, setupdate, setid, _Update, show,  setshow} = props

    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([])

    function openModal(id, nombre) {
        setData({
            id: id,
            nombre: nombre
        })
        setIsOpen(true);
    }

    const Lista =()=>{
        return(
            user.map((e, i) => (
                <ul key={i}>
                    <li  className="p-1" role="button" onClick={()=>openModal(e.id, e.nombre)}>{e.nombre} {e.apellido}</li>
                </ul>
            ))
        )
    }

    useEffect(()=>{
        socket.on('update',(data)=>{
            setApellido("")
            setNombre("")
            setContraceña("")
            setid("")
            setid(data[0].id)
            setApellido(data[0].apellido)
            setNombre(data[0].nombre)
            setContraceña(data[0].contraceña)
            console.log(data[0].contraceña);
        })
    },[update])

   
    

    return (
        <>
            <nav className="navbar bg-dark">
                <h1 className="text-light text-center">Crud con Sockt.io y mysql</h1>
            </nav>

            <div className="container p-3">
                <div className="row">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group p-2">
                                    <input type="text" className="form-control" placeholder="Ingrese un nombre"
                                        value={Nombre}
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <input type="text" className="form-control" placeholder="Ingrese un apellido"
                                        value={Apellido}
                                        onChange={e => setApellido(e.target.value)}
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <input type="text" className="form-control" placeholder="Ingrese un contraceña"
                                        value={Contraceña}
                                        onChange={e => setContraceña(e.target.value)}
                                    />
                                </div>
                                <div className="form-group p-2">
                                   { !show 
                                   ?  <button className="form-control btn btn-dark" onClick={SaveUser}>Send</button>
                                   :  <button className="form-control btn btn-info" onClick={_Update}>Update</button>     
                                   }
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="col-md-5">
                        <div className="card">
                            <div className="crad-body">
                            {
                               <Lista /> 
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalSocket 
               data={data}
               modalIsOpen={modalIsOpen}
               setIsOpen={setIsOpen}
               openModal={openModal}
               setupdate={setupdate}
               update={update}
               setshow={setshow}
            />
        </>
    );
}

export default NuevoUsuario;