import React, { useState, useEffect } from 'react';
import socket from './components/Socket';
import NuevoUsuario from './views/nuevo_usuario'
import './App.css';

function App() {
  socket.emit("react", "hola desde cliente")
  
  const [Nombre, setNombre] = useState('')
  const [Apellido, setApellido] = useState('')
  const [Contraceña, setContraceña] = useState('')
  const [id, setid] = useState('')
  // usuario
  const [user, setUser] = useState([])
  // show Update
  const [update, setupdate] = useState(false)
  const [show, setshow] = useState(false)

 
  
  useEffect(() => {
    socket.on('usuario', data => {
      setUser(data)
      console.log(data);
    })
    return ()=>{socket.off()}
  })
  
  const SaveUser =()=>{
    if(Nombre === '' || Apellido === '' || Contraceña === ''){
      alert('Por Favor llenar todo los campo')
    }else{
      socket.emit('usuario:nuevo',{
        nombre: Nombre,
        apellido: Apellido,
        passw: Contraceña
      })
      setApellido("")
      setNombre("")
      setContraceña("")
      
    }
  };

  const _Update=()=>{
    if(Nombre === '' || Apellido === '' || Contraceña === ''|| id === ''){
      alert('Por Favor llenar todo los campo')
    }else{
      socket.emit('update:user',{
        id: id,
        nombre: Nombre,
        apellido: Apellido,
        passw: Contraceña
      })
      setApellido("")
      setNombre("")
      setContraceña("")
      setshow(!show)
    }
  }
   
  return (
    <div className="contaniner">
        <NuevoUsuario
        user={user}
        SaveUser={SaveUser}
        setNombre={setNombre}
        Nombre={Nombre}
        setApellido={setApellido}
        Apellido={Apellido}
        setContraceña={setContraceña}
        Contraceña={Contraceña}
        setupdate={setupdate}
        update={update}
        setid={setid}
        _Update={_Update}
        show={show}
        setshow={setshow}
        />
    </div>
  );
}

export default App;
