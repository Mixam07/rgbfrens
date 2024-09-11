import discord from "../../../assets/img/social_network/discord.png";
import twitter from "../../../assets/img/social_network/twitter.png";
import opensea from "../../../assets/img/social_network/opensea.png";

import s from "./Footer.module.css";
import classNames from "classnames";

const Footer = (props) => {
    return(
        <footer className={s.footer}>
            <nav className={s.social}>
                {
                    props.socialNetworks.discord.isActive ? 
                    <a className={s.href} href={props.socialNetworks.discord.href} target="_blank" ><img src={discord} alt="discord" /></a>:
                    <div className={classNames(s.href, s.unactive)}><img src={discord} alt="discord" /></div>
                }
                {
                    props.socialNetworks.twitter.isActive ? 
                    <a className={s.href} href={props.socialNetworks.twitter.href} target="_blank" ><img src={twitter} alt="twitter" /></a>:
                    <div className={classNames(s.href, s.unactive)}><img src={twitter} alt="twitter" /></div>
                }
                {
                    props.socialNetworks.opensea.isActive ? 
                    <a className={s.href} href={props.socialNetworks.opensea.href} target="_blank" ><img src={opensea} alt="opensea" /></a>:
                    <div className={classNames(s.href, s.unactive)}><img src={opensea} alt="opensea" /></div>
                }
            </nav>
            <div className={s.text}>ALL RIGHTS RESERVED, RGB FRENS.</div> 
        </footer>
    )
}

export default Footer;