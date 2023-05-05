import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './auth.module.scss';
import classNames from 'classnames/bind';
import Picaccount from "./Picaccount";
import avt from './avt.jpg'
import plus from './plus.PNG'
import Createuser from "./Createuser";

import axios from 'axios';


const cx = classNames.bind(style)

// 

function Authe() {
    document.cookie = ""
    localStorage.removeItem('id')
    const navigate = useNavigate()
    const [email, setemai] = useState('')
    const [pass, setpass] = useState('')
    const [notifi, setnotifi] = useState("We'll never share your email with anyone else.")
    const [wrongpass, setwrongpass] = useState(false)
    const [wrongtitle, setwrongtitle] = useState(false)



    const [title, settitle] = useState('')
    const [bordertitle, setbordertitle] = useState(false)





    const handlesubmit = (e) => {
        e.preventDefault(); // prevent default form submission behavior
        const emailValue = email; // get email value from state
        const passValue = pass; // get password value from state



            axios.post('https://social-mgcw.onrender.com/users/login', {
                email: emailValue,
                password: passValue
            }, {
                withCredentials: true, // Gửi cookie trong yêu cầu
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log(document.cookie)
                    if (res.status === 401) {
                        throw new Error('Unauthorized')
                    }
                    if (res.status === 403) {
                        throw new Error('wrong pass')
                    }
                    return res.data;
                })
                .then(res => {
                    localStorage.setItem('id', res._id);
                    return navigate('/')
                })
                .catch((err) => {
                    if (err.message === 'Unauthorized') {
                        setwrongpass(true)
                        setwrongtitle(true)
                        setnotifi('Wrong')
                    }

                    if (err.message === 'wrong pass') {
                        setbordertitle(true)
                        settitle('wrong password')
                    }
                });
        }


        //     fetch(`https://social-mgcw.onrender.com/users/login`, {
        //         method: 'post',
        //         credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: emailValue, // use email value from state
        //             password: passValue, // use password value from state
        //         }),
        //     })
        //         .then(res => {
        //             console.log(res)
        //             if (res.status === 401) {
        //                 throw new Error('Unauthorized')
        //             }
        //             if (res.status === 403) {
        //                 throw new Error('wrong pass')
        //             }
        //             return res.json()
        //         })
        //         .then(res => {
        //             // if(!res){
        //             localStorage.setItem('id', `${res._id}`)
        //             return navigate('/')


        //         })
        //         .catch((err) => {
        //             if (err.message === 'Unauthorized') {
        //                 setwrongpass(true)
        //                 setwrongtitle(true)
        //                 setnotifi('Wrong')
        //             }

        //             if (err.message === 'wrong pass') {
        //                 setbordertitle(true)
        //                 settitle('wrong password')
        //             }
        //         });
        // }

        const handlemmail = (e) => {
            const valuemai = e.target.value;
            setemai(valuemai)
        }
        const handlepass = (e) => {
            const valuepass = e.target.value;
            setpass(valuepass)
        }

        return (
            <div className={cx('container')}>
                <div className={cx('order')}>
                    <h1><b>My Social</b></h1>
                    <h2>Recent logins</h2>
                    <h4>Click your picture or add an account.</h4>
                    <div className={cx('acounts')}>
                        <Picaccount pic={avt} name='Tường' color={false} />
                        <Picaccount pic={plus} name='Add Account' color={true} />
                    </div>
                </div>
                <div className={cx('container-submit')}>
                    <div className={cx('container-submit-form')}>

                        <form onSubmit={handlesubmit}>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label fs-1">Email address</label>
                                <input type="email" className={`form-control fs-2 ${cx({ wrongpass })}`} id="exampleInputEmail1" onChange={handlemmail} aria-describedby="emailHelp" />
                                <div id="emailHelp" className={`form-text ${cx({ wrongtitle })}`}>{notifi}</div>
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputPassword1" className="form-label fs-1">Password</label>
                                <input type="password" className="form-control fs-3" onChange={handlepass} id="exampleInputPassword1" />
                                <div id="emailHelp" className={`form-text ${cx({ bordertitle })}`}>{title}</div>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <div className='d-grid gap-1'>
                                <button type="submit" className="btn btn-primary submit btn-lg fs-2">LOGIN</button>
                            </div>
                            <a href="/login" className={cx('forgotpass')}>Forgot password?</a>
                        </form>
                    </div>
                    <div className={cx('container-create')}>
                        <Createuser />
                    </div>
                </div>
            </div>
        );
    }

    export default Authe;

