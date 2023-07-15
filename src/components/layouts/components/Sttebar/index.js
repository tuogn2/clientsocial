import classname from 'classnames/bind'
import style from './Sitebar.module.scss'

import Option from '../Option';
import Button from '../Button';
import avt from '~/img/noavt.png'
import g from '~/img/g.jpg'
import g1 from '~/img/g1.jpg'
import g2 from '~/img/g2.jpg'
import g3 from '~/img/g3.jpg'
import g4 from '~/img/g4.jpg'
import g5 from '~/img/group1.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faGamepad, faHome, faShop, faSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classname.bind(style)
function Sitebar() {

    const [infor, setinfor] = useState({})
    const [checkimg, setcheckimg] = useState(true)


    useEffect(() => {
        fetch(`https://newsocial-server.onrender.com/users/getmyuser/${localStorage.id}`)
            .then(res => res.json())
            .then(user => {
                if (user.email) {
                    setinfor(user)
                    if (!user.avatar) {
                        setcheckimg(false)
                    }
                }
            })
            .catch(err => console.log(err))


    }, [])

    const options = [
        {
            title: 'Watch',
            icon: <FontAwesomeIcon style={{ color: "#1b7eee", width: 20 }} icon={faClapperboard} />

        },
        {
            title: 'Marketplace',
            icon: <FontAwesomeIcon style={{ color: "#1b7eee" }} icon={faShop} />

        }, {
            title: 'Trò chơi',
            icon: <FontAwesomeIcon style={{ color: "#1b7eee" }} icon={faGamepad} />

        }, {
            title: 'Xem tất cả',
            icon: <FontAwesomeIcon style={{ color: "#1b7eee", width: 20 }} icon={faSquare} />

        }
    ]

    const groups = [
        {
            img: g,
            title:'Vạn kình thần đội'

        }, {
            img: g1,
            title:'IT'

        }, {
            img: g2,
            title:'DHKTPM17C'

        }, {
            img: g3,
            title:'IUH-Đại Học công nghiệp'

        }, {
            img: g4,
            title:'Vạn kình thần đội'

        }, {
            img: g5,
            title:'Vạn kình thần đội'

        },
    ]

    return (
        <  >
            <div className={cx('wrap-options')}>
                <Option icon={<FontAwesomeIcon icon={faHome} style={{ height: 20, width: 20, color: "#1b7eee" }} />} title={`Trang chủ`} />
                <Button to={`profile/${infor._id}`}>
                    <div className={cx('wrap-option')}>
                        {checkimg ? <img className={cx('avt')} alt='avt' src={`https://newsocial-server.onrender.com/${infor.avatar}`} /> : <img className={cx('avt')} alt='avt' src={avt} />}
                        <div>{infor.name}</div>
                    </div>
                </Button>
            </div>
            <div className={cx('wrap-options')} >
                {options.map((option, index) => {
                    return <Option icon={option.icon} title={option.title} key={index} />
                })}
            </div>
            <div>
                {groups.map((group ,index)=>{
                    return (
                        <div key={index} style={{cursor:'pointer'}} className={cx('wrap-option')}>
                            <img className={cx('avt')} alt='avt' src={group.img}/>
                            <div>
                                {group.title}
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    );
}

export default Sitebar;