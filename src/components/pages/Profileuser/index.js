
import className from 'classnames/bind'
import style from './Profile.module.scss';
import backgroun from '~/img/g.jpg'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '~/components/layouts/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Uppost from '~/components/layouts/components/Uppost';
import Post from '~/components/layouts/components/Post';

import axios from 'axios';

const cx = className.bind(style)
function Profileuser() {
    const [user, setuser] = useState({})
    const [yourposts, setyourposts] = useState([{}])

    // fetch(``)
    let { id } = useParams();

    useEffect(() => {
        fetch(`https://newsocial-server.onrender.com/users/getmyuser/${id}`)
            .then(res => res.json())
            .then(value => setuser(value))
            .catch(err => console.log(err))
    }, [id])

    const handleravatar = (e) => {
        // const file = e.target.files[0];
        // file.img = URL.createObjectURL(file)
        // let formData = new FormData();
        // formData.append('avatar', file);
        // // fetch(`https://social-mgcw.onrender.com/users/addavatar/${user._id}`, {
        // fetch(`https://social-mgcw.onrender.com/users/addavatar/${user._id}`, {
        //     method: 'PATCH',
        //     credentials: 'include',
        //     body: formData,
        // })
        //     .then(res => res.json())
        //     .then(value => window.location.reload())
        //     .catch(err => console.log(err))

        const file = e.target.files[0];
        file.img = URL.createObjectURL(file);
        let formData = new FormData();
        formData.append('avatar', file);
        axios.patch(`https://newsocial-server.onrender.com/users/addavatar/${user._id}`, formData, {
            withCredentials: true,
        }).then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    const handlebackground = (e) => {
        const file = e.target.files[0];
        file.img = URL.createObjectURL(file)
        let formData = new FormData();
        formData.append('backgorund', file);
        fetch(`https://newsocial-server.onrender.com/users/addback/${user._id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })
            .then(res => res.json())
            .then(value => {
                return window.location.reload()
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetch(`https://newsocial-server.onrender.com/post/${id}`)
            .then(res => res.json())
            .then(value => setyourposts(value))
            .catch(err => console.log(err))

    }, [id])
    return (<>
        <input type='file' onChange={handleravatar} style={{ display: 'none' }} id='addavt' />
        <input type='file' onChange={handlebackground} style={{ display: 'none' }} id='addbackground' />
        <div className={cx('container-profike')} >
            <div className={cx('wrap-backround')} >
                {user.backgorund ? <img className={cx('background')} alt='background' src={`https://newsocial-server.onrender.com/${user.backgorund}`} />
                    : <img className={cx('background')} alt='background' src={backgroun} />}
                <div>
                    <label htmlFor='addbackground' className={cx('changbackgoround')}><p>Backgorund</p></label>
                </div>
                <div className={cx('wrap-infor')}>
                    <Avatar img={user.avatar} sizebig={true} />

                    <div>
                        <h1 className={cx('nameuser')}><b>{user.name}</b></h1>
                        <div className={cx('upavt')}>
                            <label htmlFor='addavt' style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCamera} /></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={cx('wrapinfor')}>
            <div className={cx('wrap-contentuser')}>
                <div className={`row ${cx('title-user')}`}><h1><b>Tiểu sử</b></h1></div>
                <button className={cx('style-button')}><h3>Thêm tiểu sử</h3></button>
                <div className={cx('style-home')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon style={{ color: '#71b1c6' }} icon={faHome} />
                    </div>
                    <div>Sống tại tuy hòa</div>
                </div>
                <div className={cx('style-home')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon style={{ color: '#71b1c6' }} icon={faLocationDot} />
                    </div>
                    <div>Đến từ phú yên</div>
                </div>

                <button className={cx('style-button')}><h3>Chỉnh sửa chi tiết</h3></button>
                <button className={cx('style-button')}><h3>Thêm sở thích</h3></button>
                <button className={cx('style-button')}><h3>Thêm nội dung đáng chú ý</h3></button>
            </div>
            <div className={cx('container-posts')} >
                <Uppost />
                <div className='ms-3'>
                    {yourposts.map((post, index) => {
                        return <Post key={index} post={post} imgs={post.image} />
                    })}
                </div>
            </div>
        </div>
    </>
    );
}

export default Profileuser;

