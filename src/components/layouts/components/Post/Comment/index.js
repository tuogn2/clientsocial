import Avatar from "../../Avatar";

import classname from 'classnames/bind'
import style from '../Post.module.scss'
import { useEffect, useState } from "react";

const cx = classname.bind(style)


function Comment({ cmt }) {
   const [user,setuser]= useState({});
   useEffect(()=>{
        fetch(`http://localhost:4000/users/getmyuser/${cmt.user}`)
        .then(res=>res.json())
        .then(value => setuser(value))
        .catch(err=>console.log(err))
         // eslint-disable-next-line
   },[])
  
    return (
        <div className={cx('container-cmt')}>
            <div className={cx('avatar-cmt')}>
                <Avatar sizesm={true} img={user.avatar}  />
            </div>
            <div className={cx('content-cmt')}>
                <h5>{user.name}</h5>
                <span>{cmt.text}
                </span>
            </div>
            
        </div>);
}

export default Comment;