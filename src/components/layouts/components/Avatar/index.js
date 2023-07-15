
import classname from 'classnames/bind'
import style from './Avatar.module.scss'
import avt from '~/img/noavt.png'


const cx = classname.bind(style)

function Avatar({img,sizesm,sizebig}) {
    // const [avatar,setavatar] = useState(true)
    const classes = cx({
        avt,
        sizesm,
        sizebig
    })
    if(img ===undefined){
        // setavatar(false)
        return <img  className={classes} alt='avt ' src={avt}/>;
    }
    return <img className={classes} alt='avt ' src={`https://newsocial-server.onrender.com/${img}`}/>
    
}

export default Avatar;