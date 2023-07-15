import classname from 'classnames/bind'
import style from './Homepage.module.scss'
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClapperboard } from '@fortawesome/free-solid-svg-icons';

import g from '~/img/g.jpg'
import g1 from '~/img/g1.jpg'
import g2 from '~/img/g2.jpg'
import g3 from '~/img/g3.jpg'
import g4 from '~/img/g4.jpg'
import g5 from '~/img/g6.jpg'
import avt1 from '~/img/group1.jpg'
import avt from '~/img/noavt.png'

import Uppost from '~/components/layouts/components/Uppost';
import Post from '~/components/layouts/components/Post';




const cx = classname.bind(style)
function Homepage() {
    const [clickbook, setclickbook] = useState(true)
    const [posts, setposts] = useState([{}])
    const cssbook = cx({
        book: true,
        clickblue: clickbook,
        noclick: !clickbook
    })
    const cssfell = cx({
        book: true,
        clickblue: !clickbook,
        noclick: clickbook
    })
    let nen = avt1;
    let back1 = g1;
    let back2 = g2;
    let back3 = g3;
    let back4 = g4;


    useEffect(() => {
        fetch(`https://newsocial-server.onrender.com/post`)
            .then(res => res.json())
            .then(value => setposts(value))
            .catch(err => console.log(err))
    }, [])
    if (clickbook === false) {
        nen = avt
        back1 = g;
        back2 = g5;
        back3 = g3;
        back4 = g2;

    }


    return (<div className={cx('container-post')}>

        <div className={cx('container-tin')}>
            <div className={cx('container-icon')}>
                <div className={cssbook} onClick={() => {
                    if (!clickbook) {
                        return setclickbook(!clickbook)
                    }
                    return;
                }}>
                    <FontAwesomeIcon icon={faBookOpen} className='me-2 fs-2' />
                    <b>Tin</b>
                </div>
                <div className={cssfell} onClick={() => {
                    if (clickbook) {
                        return setclickbook(!clickbook)
                    }
                    return;
                }}>
                    <FontAwesomeIcon icon={faClapperboard} className='me-2 fs-2' />
                    <b>Books</b>
                </div>

            </div>
            <div className={cx('container-items')}>
                <div className={cx('item-video')}>
                    <img className={cx('backgroun')} alt='anh tin' src={back1} />
                    <div className={cx('onlayer')}>
                        <img src={nen} alt='avt' />
                        <p>Đỗ Chí Tường</p>
                    </div>
                </div>
                <div className={cx('item-video')}>
                    <img className={cx('backgroun')} alt='anh tin' src={back2} />
                    <div className={cx('onlayer')}>
                        <img src={nen} alt='avt' />
                        <p>Đỗ Chí Tường</p>
                    </div>
                </div><div className={cx('item-video')}>
                    <img className={cx('backgroun')} alt='anh tin' src={back3} />
                    <div className={cx('onlayer')}>
                        <img src={nen} alt='avt' />
                        <p>Đỗ Chí Tường</p>
                    </div>
                </div><div className={cx('item-video')}>
                    <img className={cx('backgroun')} alt='anh tin' src={back4} />
                    <div className={cx('onlayer')}>
                        <img src={nen} alt='avt' />
                        <p>Đỗ Chí Tường</p>
                    </div>
                </div>


            </div>

        </div>
        <Uppost />
        {posts.map((post, index) => {
            return <Post key={index} post={post} imgs={post.image} />
        })}
        {/* key={post._id} */}
    </div>


    );
}

export default Homepage;