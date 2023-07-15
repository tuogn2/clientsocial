import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";




function Createuser() {
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [pass, setpass] = useState('')
    const [notifi, setnotifi] = useState("We'll never share your email with anyone else.")
    const [usernoti,setusernoti] = useState('')
    const [passnoti,setpassnoti] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const regexemai=(email)=>{
        let patms = /^.+(@gmail.com)$/;
        if (patms.test(email)) {
            return true;
        }
        return false;

    }
    
    const regexuser =(user)=>{
        let patms = /^.{6,}$/
        if(patms.test(user)){
            return true;
        }
        return false;
    }

    const handlesubmitcreateuser = (e) => {
        e.preventDefault();
        const enterMail = email
        const enterName = name
        const enterPass = pass

        if(regexemai(enterMail)===false){
            setnotifi('email khong hop le')
            return;
        }
        if(regexuser(enterName)===false){
            setusernoti('user phai nhieu hon 6 ki tu')
            return;
        }
        if(regexuser(enterPass)===false){
            setpassnoti('pass phai nhieu hon 6 ki tu')
            return;
        }


            fetch(`https://newsocial-server.onrender.com/users`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: enterName,
                    email: enterMail,
                    password: enterPass
                })
            })
                .then(res => {
                    if (res.status === 400) {
                        throw new Error('duplicate email')
                    }
                    return res.json();
                })
                .then(res => {
                    localStorage.setItem('id', `${res._id}`)
                    handleClose()
                    return navigate('/');
                })
                .catch(err => {
                    if (err.message === 'duplicate email') {
                        setnotifi(`${err.message}`)

                    }
                })
        
    }

    const handlepass = (e) => {
        const valuPass = e.target.value;
        setpass(valuPass)
    }
    const handleusername = (e) => {
        const valueUser = e.target.value;
        setname(valueUser);
    }
    const handleemail = (e) => {
        const valueEmail = e.target.value;
        setemail(valueEmail)
    }

    return (
        <>
            <Button variant="success" className="fs-1"  onClick={handleShow}>
                Create New Account
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SIGN UP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handlesubmitcreateuser}>
                        <div className="mb-3">
                            <label htmlFor="emaiaddress" className="form-label">Email address</label>
                            <input type="email" className="form-control fs-2" onChange={handleemail} id="emaiaddress" name="email" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">{notifi}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User name</label>
                            <input type="text" className="form-control fs-2" onChange={handleusername} name="name" id="username" aria-describedby="emailHelp" />
                            <div id="usernoti" className="form-text">{usernoti}</div>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-password" className="form-label">Password</label>
                            <input type="password" name="password" onChange={handlepass} className="form-control fs-2" id="form-password" />
                            <div id="usernoti" className="form-text">{passnoti}</div>

                        </div>
                        <div className="mb-3 mt-6 d-flex justify-content-center">
                            <button type="submit" className="btn fs-2 check btn-success">SIGN UP</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Createuser;
