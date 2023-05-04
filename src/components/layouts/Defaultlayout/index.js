import Header from "../components/Header";
import Sitebar from "../components/Sttebar";

import className from 'classnames/bind'
import style from './Defaultlayout.module.scss'
import Friendlist from "../components/Friendlist";


const cx = className.bind(style)
function Defaultlayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrap-body')}>
                <div className={cx('sitebar-left')}>
                    <Sitebar />
                </div>
                <div className={cx('center-content')}>
                    {children}
                </div>
                <div className={cx('sitebar-right')}>
                    <Friendlist />
                </div>

            </div>
        </div>
    );
}

export default Defaultlayout;