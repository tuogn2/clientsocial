import classname from 'classnames/bind'
import style from './notfound.module.scss'
const cx = classname.bind(style)
function Notfound() {
    return (
    <section className={cx('page_404')}>
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <div className="col-sm-10 col-sm-offset-1 text-center">
                    <div className={cx('four_zero_four_bg')}>
                        <h1 className="text-center">404</h1>
                    </div>
                    <div className={cx('content_box_404')}>
                        <h3 className="h2">Looks Like You're Lost</h3>
                        <p>The page you are looking for not available</p>
                        <a href="/login">Go to login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>);
}

export default Notfound;