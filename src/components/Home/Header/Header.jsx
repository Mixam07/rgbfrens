import logo from "../../../assets/img/logo.png";

import { Web3Button } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';

import s from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = (props) => {
    useEffect(() => {
        props.setAddress(props.ethereumClient.getAccount().address);

        const setIntervalId = setInterval(() => {
            if(props.address !== null && !(props.address === props.ethereumClient.getAccount().address)){
                clearInterval(setIntervalId);
                return props.setAddress(props.ethereumClient.getAccount().address)
            }
        }, 1000);
    }, [props.address]);

    return(
        <>
            <div className={s.img}>
                <img src={logo} alt="logo" />
            </div>
            <div className={s.wrap}>
                <WagmiConfig client={props.wagmiClient}>
                    <Web3Button class={s.Web3Button} />
                </WagmiConfig>
                <button className={s.button}>
                    {
                        !props.address ? "Connect wallet" : `Connected as ${props.address.slice(0,3)}...${props.address.slice(-3)}`
                    }
                </button>
            </div>
        </>
    )
}

export default Header;