import Header from "../components/Header";
import className from 'classnames/bind'
import style from './Userlayout.module.scss';

const cx = className.bind(style)
function Userlayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('content')} >
                {children}
            </div>
        </div>
    );
}

export default Userlayout;