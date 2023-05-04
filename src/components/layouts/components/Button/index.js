// import classNames from 'classnames/bind'
// import style from './Button.module.scss'
// import { Link } from 'react-router-dom'

// const cx = classNames.bind(style)
// function Button({ to, href, children, onclick, ...passprop }) {
//     let Comp ='button'
//     let props ={
//         ...passprop
//     }

//     if(to){
//         props.to =to
//         Comp=Link
//     }
//     if(href){
//         props.href =href
//         Comp='a'
//     }
//     const classes = cx('wrapper');
//     return ( <Comp classNames={classes} {...props} onclick={onclick}>
//         {children}
//     </Comp> );
// }


// export default Button;

import classNames from "classnames/bind";
import style from './Button.module.scss';
import { Link } from "react-router-dom";
const cx = classNames.bind(style)

function Button({ to, href, children, onclick, ...passprop }) {
    let Comp = 'button'
    let props = {
        ...passprop
    }
    if (to) {
        props.to = to;
        Comp = Link // thẻ link trong router dom
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper');
    return <Comp className={classes} {...props} onClick={onclick}>
        {children}
    </Comp>;

}

export default Button;