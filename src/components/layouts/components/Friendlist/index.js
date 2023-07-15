import { useEffect, useState } from "react";
import Userbutton from "../Userbutton";

import gitf from '~/img/gitf.png'
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";


function Friendlist() {
    const [users, setusers] = useState([{}])
    let k = 1;
    useEffect(() => {
        fetch(`https://newsocial-server.onrender.com/users`)
            .then(res => res.json())
            .then(userss => setusers(userss)
            )
    }, [])
    return (
        <>
            <div className="ms-3">
                <h2 className="text-white mt-3"><b>Sinh nhật</b></h2>
                <div className="border-bottom  text-white" style={{cursor: 'pointer'}}>
                    <img src={gitf} alt="gift"/>
                    Hôm nay sinh nhật mình
                </div>
            </div>
            <div className="d-flex justify-content-between ms-3 mt-3">
                <h3 className="text-white">Người liên hệ</h3>
                <div >
                    <FontAwesomeIcon  className="text-white ms-3" icon={faCameraAlt}/>
                    <FontAwesomeIcon className="text-white ms-3" icon={faSearch}/>
                    <FontAwesomeIcon className="text-white ms-3 me-3"  icon={faEllipsis}/>
                </div>
            </div>
            {users.map((user,index) => {
                if (k < 15) {
                    k++;
                    return (<Button key={index} to={`profile/${user._id}`}>
                        <Userbutton  user={user} />
                    </Button>)
                }
                return<></>;
            })}
        </>);
}

export default Friendlist; 