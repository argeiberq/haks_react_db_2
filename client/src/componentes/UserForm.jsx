import React, {useCallback, useEffect} from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import {useNavigate, useParams} from 'react-router-dom'
export default function UserForm(){
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const { id } = useParams()

    const fetchUsuario = useCallback(async () =>{
        if ( id ) {
            const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
            reset(response.data)
        }
    },[id, reset])

    useEffect(() => {
        fetchUsuario()
    }, [fetchUsuario])
    const onSubmit = async (data) => {
    if (id) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, data)
    } else {
        await axios.post('http://localhost:5000/api/tasks', data)
    }
    navigate('/')
}
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('_name',{required: true})} placeholder='_name' />
            <input {...register('email',{required: true})} placeholder='email' />
            <input type='number' {...register('age',{required: true})} placeholder='age' />
            <button type="submit">{id ? 'Actualizar':'Agregar' } usuario</button>
        </form>
    )
}