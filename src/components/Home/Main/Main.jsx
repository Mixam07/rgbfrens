import AboutContainer from "../../About/AboutContainer";
import MintContainer from "../../Mint/MintContainer";
import CheckContainer from "../../Check/CheckContainer";

import { useState } from "react";
import s from "./Main.module.css";
import classNames from "classnames";

const Main = (props) => {
    const [ type, setType ] = useState("mint");
    return(
        <div className={s.promo}>
            <nav className={s.btns}>
                <button onClick={ () => { setType("mint") } } className={classNames(s.btn, {[s.active]: type === "mint"})}>Mint</button>
                <button onClick={ () => { setType("about") } } className={classNames(s.btn, {[s.active]: type === "about"})}>About</button>
                <button onClick={ () => { setType("check") } } className={classNames(s.btn, {[s.active]: type === "check"})}>Check</button>
            </nav>
            <section className={s.section}>
                {
                    type === "mint" ? <MintContainer setMessage={props.setMessage} setIsLoading={props.setIsLoading} setIsUnactive={props.setIsUnactive} /> :
                    type === "about" ? <AboutContainer /> :
                    type === "check" ? <CheckContainer /> : null
                }
            </section>
        </div>
    )
}

export default Main;