import {useEffect, useState} from 'react'
import axios from 'axios'
import '../index.css';
import {Link} from 'react-router-dom'
export default function UserList() {
	const [usuarios, setUsuarios] = useState([])
	const fetchUsuarios = async () => {
		const response = await axios.get('http://localhost:5000/api/tasks')
		setUsuarios(response.data)
	}
	const handleDelete = async (id) => {
	await axios.delete(`http://localhost:5000/api/tasks/${id}`)
	fetchUsuarios();
	}


	useEffect( () => {
		fetchUsuarios();
	},[]);
	return (
	<div>
	<Link to="/add"> agregar</Link> 
		<lu>
			{
			usuarios && usuarios.map(usuario => (
			<li key={usuario.id}>
				{usuario._name} - {usuario.email} - {usuario.age}
                <Link to={`./edit/${usuario.id}`}>editar</Link>
                <button onClick={() => handleDelete(usuario.id)}>eliminar</button>
			</li>
			))
			}
		</lu>
	</div>
        )}
