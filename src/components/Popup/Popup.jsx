import Canvas from "../common/Canvas/Canvas";
import s from "./Popup.module.css";

const Popup = (props) => {
    return(
        <Canvas onClick={props.onClick} isShow={props.isShow}>
            <ul className={s.mainList}>
                <li className={s.elem}>
                    <div className={s.title}>FRENSLIST</div>
                    <ul className={s.list}>
                        <li className={s.item}>{props.info.Frenslist.time}</li>
                        <li className={s.item}>{props.info.Frenslist.price}</li>
                    </ul>
                </li>
                <li className={s.elem}>
                    <div className={s.title}>PUBLIC</div>
                    <ul className={s.list}>
                        <li className={s.item}>{props.info.Public.time}</li>
                        <li className={s.item}>{props.info.Public.price}</li>
                    </ul>
                </li>
            </ul>
        </Canvas>
    )
}

export default Popup;