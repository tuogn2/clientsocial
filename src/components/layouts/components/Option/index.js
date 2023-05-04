import classname from 'classnames/bind'
import style from '../Sttebar/Sitebar.module.scss'




const cx =classname.bind(style)
function Option({ title, icon }) {
    return (
        <>
            <div className={cx('wrap-option')}>
               {icon}
               <div>{title}</div>
            </div>
        </>);
}

export default Option;