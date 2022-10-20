import React, {useState, useEffect} from 'react'
import {db} from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';





const Formulario = () => {
    const [nombres, setnombres] = useState('')
    const [apellidos, setapellidos] = useState('')
    const [telefono, settelefono] = useState('')
    const [cedula, setcedula] = useState('')  
    const [correo, setcorreo] = useState('')
    const [direccion, setdireccion] = useState('')
    const [nacionalidad, setnacionalidad] = useState('')
    //aqui iba listaFrutas const [listaFrutas, setListaFrutas] = React.useState([])
    const [listaformulario, setlistaformulario] = useState([])
    const [id, setId] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [error, setError] = useState(null)

       useEffect(()=>{
         const obtenerDatos= async () =>{
             try{

                await onSnapshot(collection(db, "personas"), (query)=>{  
                    setlistaformulario(query.docs.map((doc)=>({...doc.data(), id:doc.id})))

                 
                })
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    //aqui iba guardar fruta
    const guardarpersonas = async (e) =>{
        e.preventDefault()

        try{
            const data = await addDoc(collection(db, 'personas'),{
                persona_nombre: nombres,
                persona_apellido: apellidos,
                persona_telefono: telefono,
                persona_cedula: cedula,
                persona_correo: correo,
                persona_direccion: direccion,
                persona_nacionalidad: nacionalidad
            })

            setlistaformulario([
                ...listaformulario,
                {persona_nombre: nombres,
                    persona_apellido: apellidos,
                    persona_telefono: telefono,
                    persona_cedula: cedula,
                    persona_correo: correo,
                    persona_direccion: direccion,
                    persona_nacionalidad: nacionalidad, id:data.id}
            ])

            setnombres('')
            setapellidos('')
            settelefono('')
            setcedula('')
            setcorreo('')
            setdireccion('')
            setnacionalidad('')

        }catch(error){
            console.log(error)
        }
    }


    const editar = item =>{
        setnombres(item.persona_nombre)
        setapellidos(item.persona_apellido)
        settelefono(item.persona_telefono)
        setcedula(item.persona_cedula)
        setcorreo(item.persona_correo)
        setdireccion(item.persona_direccion)
        setnacionalidad(item.persona_nacionalidad)
        setModoEdicion(true)
        setId(item.id)
    }
    //aqui iba editarFrutas
    const editarpersonas = async (e) =>{
        e.preventDefault()

        if(!nombres.trim()){
            setError('Digite sus nombres')
             return
         }
 
         if(!apellidos.trim()){
             setError('Digite sus apellidos')
             return
         }
 
         if(!telefono.trim()){
             setError('Digite su telefono')
             return
         }
 
         if(!cedula.trim()){
             setError('Digite su cedula')
             return
         }
 
         if(!correo.trim()){
             setError('Digite su correo')
             return
         }
         
         if(!direccion.trim()){
             setError('Digite su direccion')
             return
         }
 
         if(!nacionalidad.trim()){
             setError('Digite su nacionalidad')
             return
         }

         try{
             const docRef = doc(db, 'personas', id);
             await updateDoc(docRef, {
                
            
                persona_nombre: nombres,
                persona_apellido: apellidos,
                persona_telefono: telefono,
                persona_cedula: cedula,
                persona_correo: correo,
                persona_direccion: direccion,
                persona_nacionalidad: nacionalidad
             })

             const nuevoArray = listaformulario.map(
                item => item.id === id ? {id: id, persona_nombre: nombres, persona_apellido: apellidos, persona_telefono: telefono,
                    persona_cedula: cedula, persona_correo: correo, persona_direccion: direccion,
                     persona_nacionalidad: nacionalidad} : item
        
             
            )
    
            setlistaformulario(nuevoArray)
            setnombres('')
            setapellidos('')
            settelefono('')
            setcedula('')
            setcorreo('')
            setdireccion('')
            setnacionalidad('')
            setId('')
            setModoEdicion(false)
            

         }catch(error){
             console.log(error)
         }

        
    } 

    const eliminar = async id =>{
        try{
            
            await deleteDoc(doc(db, 'personas', id))
            
        }catch(error){
            console.log(error)
        }

        
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setnombres('')
            setapellidos('')
            settelefono('')
            setcedula('')
            setcorreo('')
            setdireccion('')
            setnacionalidad('')
            setId('')
        
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>FORMULARIO</h1>
        <hr/>
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Listado de personas</h4>
                <ul className='list-group'>
                    
              
                    {
                        listaformulario.map(item=>(
                          
                            <li className='list-group-item' key={item.id}>  
                            <div>
                                <img alt = "" src = {`https://picsum.photos/350/350?random=${item.id}`}/>
                                </div>
                                <span className='lead'>{item.persona_nombre}-{item.persona_apellido}-{item.persona_telefono}-{item.persona_cedula}-{item.persona_correo}-{item.persona_direccion}-{item.persona_nacionalidad}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>
                                Eliminar
                                </button>
                                <button className='btn btn-warning btn-sm float-end'onClick={()=>editar(item)}>
                                Editar
                                </button>
                            </li>    
                        ))
                    }
                </ul>
            </div>


            <div className='col-4'>
                <h4 className='text-center'>
                    {
                        modoEdicion ? 'Editar personas' : 'Agregar personas'
                    }
                    </h4>
                <form onSubmit ={modoEdicion ? editarpersonas: guardarpersonas}>
                    {
                        error ? <span className='text-danger'>{error}</span> : null
                    }
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese su Nombre'
                    onChange={(e)=> setnombres(e.target.value)}
                    value = {nombres}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese sus Apellidos'
                    type="text"
                    onChange={(e)=> setapellidos(e.target.value)}
                    value={apellidos}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese su Telefono'
                    type="text"
                    onChange={(e)=> settelefono(e.target.value)}
                    value={telefono}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese su Cedula'
                    type="text"
                    onChange={(e)=> setcedula(e.target.value)}
                    value={cedula}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese su Correo'
                    type="text"
                    onChange={(e)=> setcorreo(e.target.value)}
                    value={correo}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese su Direccion'
                    type="text"
                    onChange={(e)=> setdireccion(e.target.value)}
                    value={direccion}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese su Nacionalidad'
                    type="text"
                    onChange={(e)=> setnacionalidad(e.target.value)}
                    value={nacionalidad}
                    />
                    
                    

                    {
                        modoEdicion ?
                        (
                            <>
                                <button 
                                className='btn btn-warning btn-block'
                                on='submit'>Editar</button>
                            <button
                            className='btn btn-dark btn-block mx-2'
                            onClick={()=>cancelar()}>Cancelar</button>
                            </>
                        )
                        :

                        <button 
                        type='submit'
                        className='btn btn-primary btn-block'>
                        Agregar
                        </button>

                        }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario