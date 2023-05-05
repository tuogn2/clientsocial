import classname from 'classnames/bind'
import style from './Uppost.module.scss'


import Avatar from '../Avatar';
import camera from '~/img/camera.png'
import image from '~/img/image.png'
import smile from '~/img/smile.png'


import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const cx = classname.bind(style)
function Uppost() {


    

    const [infor, setinfor] = useState({})
    const [upimg, setupimg] = useState(null)
    const [content, setcontent] = useState('')



    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`https://social-mgcw.onrender.com/users/getmyuser/${localStorage.id}`)
            .then(res => res.json())
            .then(user => {
                if (user.email) {
                    setinfor(user)
                }
            })
            .catch(err => console.log(err))
    }, [])


    const handleimg = (e) => {
        const file = e.target.files[0];
        file.img = URL.createObjectURL(file)
        setupimg(file)

    }


    const handercontent = (e) => {
        setcontent(e.target.value);


    }
    const  handlesubmit = (e)=>{
        e.preventDefault()

        let formData = new FormData();
        if(!upimg){
            formData.append('pictureposts', null);

        }else{
            formData.append('pictureposts', upimg);
        }
        formData.append('text', content);
        formData.append('user', infor._id);
        fetch(`https://social-mgcw.onrender.com/post`, {
            method: 'post',
            credentials: 'include',
            // headers: {
            //     'Content-Type': `multipart/form-data;boundary=${formData._boundary}`
            // },
            body:formData,
        } )
        .then(res=>res.json())
        .then(value => window.location.reload())
        .catch(err=>console.log(err))
    }
    
    return (<>
        <Button variant='' className={`btn-lg ${cx('hello')}`} onClick={handleShow}>
            <div className={cx('wrap-upload')}>
                <div className={cx('wrap-image')}>
                    <div>
                        <Avatar img={infor.avatar} />
                    </div>
                    <input type='text' className='fs-3' placeholder={`${infor.name} bạn đang nghĩ gì ?`} />
                </div>
                <div className={cx('wrap-options')}>
                    <div className={cx('costorm')}>
                        <img src={camera} alt='cmr' />
                        <span>Video trực tuyến</span>
                    </div>
                    <div className={cx('costorm')}>
                        <img src={image} alt='img' />
                        <span>Ảnh/video</span>

                    </div>
                    <div className={cx('costorm')}>
                        <img src={smile} alt='smile'/>
                        <span>Cảm xúc/hoạt động</span>

                    </div>
                </div>
            </div>
        </Button>
        <div style={{ backgroundColor: 'red' }}>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header className={cx('header')} >
                    <h1><b>Tạo bài viết</b></h1>
                    <button type="button" onClick={handleClose} className={`btn-close ${cx('btnclose')}`} aria-label="Close"></button>
                </Modal.Header>
                <Modal.Body className={cx('body')}>
                    <form onSubmit={handlesubmit} encType="multipart/form-data">
                        <div>
                            <Avatar img={infor.avatar} />
                            <span className='ms-3'>{infor.name}</span>
                        </div>
                        <div className={cx('wrap-textarea')}>
                            <textarea onChange={handercontent} placeholder={`${infor.name} Bạn đang nghĩ gì?`} />
                            {/* {upimg==''? <></>:<img src={upimg}/>} */}
                            {upimg && <img className={cx('img-costom')} alt='up' src={upimg.img} />}
                        </div>
                        <div>
                            <label htmlFor='uploadfile'>
                                <div className={cx('wrap-options')}>
                                    <div className={cx('costorm')}>
                                        <img src={camera} alt='cmr' />
                                        <span>Video trực tuyến</span>
                                    </div>
                                    <div className={cx('costorm')}>
                                        <img src={image} alt='img' />
                                        <span>Ảnh/video</span>

                                    </div>
                                    <div className={cx('costorm')}>
                                        <img src={smile} alt='smile' />
                                        <span>Cảm xúc/hoạt động</span>
                                    </div>
                                </div>
                            </label>
                            <input type='file'  style={{display:'none'}} onChange={handleimg} id='uploadfile' />

                            <div className={cx('wrap-uppost')}>
                                <button type='submit'>Đăng bài viết</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    </>);
}

export default Uppost;