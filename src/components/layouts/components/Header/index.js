import style from './header.module..scss'
import classNames from 'classnames/bind';
import logo from './nen2.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Search from './Search';
import Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(style)

function Header() {
    const [infor, setinfor] = useState({})
    const [chechligin, setchecklogin] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:4000/users/getmyuser/${localStorage.id}`)
            .then(res => res.json())
            .then(user => {
                if (user.email) {
                    setchecklogin(false)
                    setinfor(user)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className={cx('container-header')}>
            <div>
                <Link to='/' className={cx('link')}>
                    <img src={logo} alt='logo' className={cx('logo')} />
                </Link>
            </div>
            <div className={cx('wraper-search')}>
                <Search />
            </div>
            <div className={cx('wrapper-avt')}>
                <div className={cx('ring')}>
                    <FontAwesomeIcon icon={faFacebookMessenger} className={cx('ring-icon')} />
                </div>
            <div className={cx('ring')}>
                <FontAwesomeIcon icon={faBell} className={cx('ring-icon')} />
            </div>

            {chechligin ? (<div className={cx('wrap-login')}>
                <Link to='/login' className={cx('btnlogin')}><b>Đăng Nhập</b></Link>
            </div>
            ) : <div className={cx('wrap-login')}><Profile infor={infor} /> </div>}
            </div>


        </div>);
}

export default Header;

    