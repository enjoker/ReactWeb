import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Form } from 'react-bootstrap'
import axios from 'axios'

const EditUser = () => {
    let { userId } = useParams();
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])

    const onChangeName = (event) => {
        setName(event.currentTarget.value);
    }
    const onChangePhone = (event) => {
        setPhone(event.currentTarget.value);
    }
    const onChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const saveData = (event) => {
        event.preventDefault()
        axios.post('http://103.75.200.45:8088/edituser',{
            Id: parseInt(userId),
            name: name,
            phone: phone,
            email: email,
            password: password
        }).then(res=>{
            console.log(res)
            window.location.replace('/user')
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        const getUser = async () => {
            await axios.post('http://103.75.200.45:8088/getuserdetail/' + userId)
                .then(res => {
                    setName(res.data.name)
                    setPhone(res.data.phone)
                    setEmail(res.data.email)
                    setPassword(res.data.password)
                })
                .catch(err => {
                    console.error(err)
                })
        }
        getUser()
    }, [userId])
    return (
        <React.Fragment>
            <div className="profileContainer" style={{ minWidth: 400, position: 'relative' }}>
                <h1 className="profileName" style={{ textAlign: 'center' }}>Edit User</h1>
                <Form onSubmit={saveData}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={onChangeName} required />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control type="number" name="phone" value={phone} onChange={onChangePhone} required />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="Email" name="email" value={email} onChange={onChangeEmail} required />
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="text" name="Password" value={password} onChange={onChangePassword} required />
                    </Form.Group>
                    <input className="submitBtn" type="submit" value="Save" style={{ marginTop: 40 }} />
                </Form>
            </div>
        </React.Fragment>
    )
}

export default EditUser