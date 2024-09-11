import logo from "../../assets/img/logo.png";
import arrow from "../../assets/img/arrow.svg";

import s from "./Enter.module.css";

const Enter = (props) => {
    return(
        <div className={s.canvas}>
            <div className={s.enter}>
                <div className={s.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <button onClick={props.forestFun} to="/home" className={s.button}>
                    <div className={s.img}>
                        <img src={arrow} alt="arrow" />
                    </div>
                    <div className={s.text}>Enter</div>
                    <div className={s.img}>
                        <img src={arrow} alt="arrow" />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Enter;