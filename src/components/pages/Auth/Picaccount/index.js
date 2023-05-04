import classNames  from 'classnames/bind'
import style from '../auth.module.scss'
const cx = classNames.bind(style)
function Picaccount({ pic, name ,color}) {
    const classes =cx('container-pic',{
        color 
    })
    return (
    <div className={classes}>
        <img src={pic} alt='avt'/>
        <div className={cx('userName')}>
        {name}
        </div>
    </div>);
}

export default Picaccount;