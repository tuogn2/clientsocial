import { useEffect, useState } from "react";
import avt from '~/img/noavt.png'

import className from 'classnames/bind'
import style from './Userbutton.module.scss'
const cx = className.bind(style)

function Userbutton({ user }) {
    const [checkimg, setcheckimg] = useState(true)
    useEffect(() => {
        if (!user.avatar) {
            setcheckimg(false)
        }
    }, [])

    
    return (<>
        <div className={cx('container-user')}>
            {checkimg ? <img src={`http://localhost:4000/${user.avatar}`} /> : <img src={avt} />}
            <p>
                <b>
                    {user.name}
                </b>
            </p>
        </div>
    </>);
}

export default Userbutton;