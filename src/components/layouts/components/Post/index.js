import classname from 'classnames/bind'
import style from './Post.module.scss'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faComment, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import like from '~/img/like.png'
import Avatar from '../Avatar';
import Comment from './Comment';



const cx = classname.bind(style)
function Post({ post, imgs }) {
    const [userinfo, setuserinfor] = useState({})
    const [remove, setremove] = useState(false)
    const [content, setcontent] = useState('');
    const [liked, setliked] = useState(false)

    const [myaccount, setmyaccount] = useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/users/getmyuser/${localStorage.getItem('id')}`)
            .then(res => res.json())
            .then(value => setmyaccount(value))
            .catch(err => console.log(err))
    }, [])

    let soluotlike;
    // { post.likecount ? soluotlike = post.likecount.length : soluotlike = 0 }
    if (post.likecount) {
        soluotlike = post.likecount.length
    } else {
        soluotlike = 0
    }
    const [countliked, setcountliked] = useState(soluotlike)
    useEffect(() => {
        fetch(`http://localhost:4000/users/getmyuser/${post.user}`)
            .then(res => res.json())
            .then(value => {
                return setuserinfor(value)
            })
            .catch(err => console.log(err))
    }, [post.user])

    useEffect(() => {
        if (remove) {
            fetch(`http://localhost:4000/post/deletepost`, {
                method: 'delete',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: post._id,
                    userid: localStorage.getItem('id')
                }),
            })
                .then(res => {
                    if (res.status === 400) {
                        throw new Error('khong co quyen xoa')
                    }

                    return res.json()
                })
                .then(value => {
                    window.location.reload()

                })
                .catch(err => {
                    if (err.message === 'khong co quyen xoa') {
                        alert('không có quyên xóa tus của người khác!!!')
                    }
                })
        }
    }, [remove, post._id])


    const handlecontentcmt = (e) => {
        const valuecontent = e.target.value;
        setcontent(valuecontent)
    }


    const handlesubmitcmtform = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/post/comment`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: post._id,
                comment: {
                    userId: localStorage.getItem("id"),
                    text: content
                }
            }),
        })
            .then(res => res.json())
            .then(value => {

                return (window.location.reload());
            }
            )
            .catch(err => console.log(err))
    }
    const handlerlike = () => {
        if (liked === false) {
            fetch(`http://localhost:4000/post/like`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: post._id,
                    userId: localStorage.getItem('id')
                }),
            })
                .then(res => {
                    return res.json()
                })
                .then(value => {
                    // window.location.reload()
                    setcountliked(countliked + 1)

                })
                .catch(err => console.log(err))
        }

        if (liked === true) {
            fetch(`http://localhost:4000/post/dislike`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: post._id,
                    userId: localStorage.getItem('id')
                }),
            })
                .then(res => {
                    return res.json()
                })
                .then(value => {
                    // window.location.reload()
                    setcountliked(countliked - 1)


                })
                .catch(err => console.log(err))
        }

        //

        setliked(!liked)
    }

    useEffect(() => {
        let checkliked = 0;
        post.likecount && post.likecount.map((id) => {
                if (id === localStorage.getItem('id')) {
                    checkliked = 1;
                    return<></>;
                }
                return<></>;
            })
                
        if (checkliked === 1) {
            setliked(true)

        }
    }, [post.likecount])

    const classeslike = cx({
        like,
        liked
    })


    let socmt = 0;
    userinfo.date = new Date(post.created_at)
    userinfo.dmy = userinfo.date.getDate() + "/" + (userinfo.date.getMonth() + 1) + "/" + userinfo.date.getFullYear()
    return (
        <div className={cx('wrap-post')}>
            <div className={cx('wrap-optionuser')} >
                <div className={cx('wrap-userinfo')}>
                    <Avatar className={cx('avt')} img={userinfo.avatar} />
                    <div>
                        <p>{userinfo.name}</p>
                        <p style={{ color: '#a8abaf' }}>{userinfo.dmy}</p>
                    </div>
                </div>
                <div className={cx('option-post')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                    <span onClick={() => setremove(true)} >
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
            </div>
            <div className='mt-2'>
                {post.text}
            </div>
            <div className={cx('wrap-image')}>
                {imgs && imgs.map((img, index) => {
                    return <img className='col-12' alt='anh' key={index} src={`http://localhost:4000/${img}`} />
                })}
            </div>
            <div className={cx('likecount')}>
                <img src={like} alt='likecount' />
                {/* <span>{post.likecount && post.likecount.length}</span> */}
                <span>{countliked}</span>
            </div>
            <div className={cx('wrap-cmt')}>
                <div onClick={handlerlike} className={classeslike}>
                    <FontAwesomeIcon className='me-2' icon={faThumbsUp} />
                    Like
                </div>
                <div className={cx('cmt')}>
                    <FontAwesomeIcon className='me-2' icon={faComment} />
                    Comment
                </div>
            </div>
            <div>
                <form onSubmit={handlesubmitcmtform}>
                    <div className={cx('write-cmt')}>
                        <div className={cx('avatar-write-cmt')}>
                            <Avatar img={myaccount.avatar} sizesm={true} />
                        </div>
                        <div className={cx('input-cmt')}>
                            <textarea type='text' onChange={handlecontentcmt} placeholder='Enter your cmt' />
                            <button type='submit' value='enter' >enter</button>

                        </div>
                    </div>
                </form>

                {post.comment && post.comment.map((cmt, index) => {
                    if (socmt < 15) {
                        return <Comment cmt={cmt} postid={post._id} key={index} />
                    }
                    return <></>;
                })}
            </div>

        </div>);
}

export default Post;