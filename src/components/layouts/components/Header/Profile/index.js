import classNames from 'classnames/bind'
import style from './Profile.module.scss'

import React from 'react'
import Tippy from '@tippyjs/react/headless';

import avt from '~/img/noavt.png'
import Button from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faGear, faMoon, faQuestionCircle, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(style)
function Profile({ infor }) {
    let k =true
    if (infor.avatar === undefined) {
        k=false
        // infor.avatar = avt
        
    }




    return (<>
        <Tippy
            trigger='click'
            interactive
            placement='top-end'
            render={attrs => (
                <div className={cx('containerbtns')} style={{ ...attrs.style, left: '-100px' }}>
                    <Button to={`/profile/${infor._id}`}>
                        <div className={cx('containerbutton')}>
                            <div className={cx('container-img')}>

                                {k? <img src={`https://social-mgcw.onrender.com/${infor.avatar}`}alt='avt' />:<img src={avt} alt='avt' />}
                            </div>
                            <p >{infor.name}</p>
                        </div>
                    </Button>
                    <Button >
                        <div className={cx('content-icon')}>
                            <div className={cx('setgear')}>
                                <div className={cx('container-icon')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                                </div>
                                <p>
                                    Cài đặt và quyền riêng tư
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </Button>
                    <Button >
                        <div className={cx('content-icon')}>
                            <div className={cx('setgear')}>
                                <div className={cx('container-icon')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faMoon} />
                                </div>
                                <p>
                                    Màn hình và chức năng
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </Button>
                    <Button >
                        <div className={cx('content-icon')}>
                            <div className={cx('setgear')}>
                                <div className={cx('container-icon')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faQuestionCircle} />
                                </div>
                                <p>
                                    Trợ giúp và hỗ trợ
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </Button>
                    <Button to='/login' >
                        <div className={cx('content-icon')}>
                            <div className={cx('setgear')}>
                                <div className={cx('container-icon')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRightToBracket} />
                                </div>
                                <p>
                                    Đăng xuất
                                </p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Button>

                </div>

            )}
        >

            <div className={cx('container-img')}>
                {k? <img src={`https://social-mgcw.onrender.com/${infor.avatar}`} alt='avt' />:<img src={avt} alt='avt' />}
            </div>
        </Tippy>

    </>);
}

export default Profile;