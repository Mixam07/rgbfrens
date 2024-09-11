import loading from "../../assets/gif/loading.gif";

import s from "./Home.module.css";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import Web3 from "web3";

import PopupContainer from "../Popup/PopupContainer";
import HeaderContainer from "./Header/HeaderContainer";
import FooterContainer from "./Footer/FooterContainer";
import Main from "./Main/Main";

const Home = (props) => {
    const ref = useRef(null);
    const [ isUnactive, setIsUnactive ] = useState(false);
    const [ panelHeight, setPanelHeight ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ timer, setTimer ] = useState(null);
    const [ message, setMessage ] = useState({
        test: null,
        href: null,
        isChanged: false
    });

    const chains = [arbitrum, mainnet, polygon];
    const infuraProvider = `https://mainnet.infura.io/v3/5af80a4c29b24c009d51a66e971713e2`;
    const projectId = 'f7f6b33fdb0c7cdc8a96d58f172596c8';

    const { provider } = configureChains(chains, [w3mProvider({ provider: infuraProvider, projectId })]);
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: w3mConnectors({ version: 1, chains }),
        provider,
    });

    const web3Provider = new Web3(infuraProvider);
    const ethereumClient = new EthereumClient(wagmiClient, chains, web3Provider);
    
    useEffect(() => {
        if(ref){
            setPanelHeight(ref.current.offsetHeight - document.documentElement.offsetHeight);
        }
    }, [ref]);

    useEffect(() => {
        if(!message.text) return
    }, [message]);

    const setMessageFun = (data) => {
        setTimeout(() => {
            setMessage({
                test: null,
                href: null,
                isChanged: false
            });
        }, 5000);
        setMessage({
            ...data,
            isChanged: message.text ? true : false
        })
    }
    
    return(
        <>
            <main ref={ref} className={classNames(s.main)} style={{height: `calc(100vh - ${panelHeight}px)`}} >
                <div className={s.bg}>
                    <div className={s.wrapper}>
                        <HeaderContainer ethereumClient={ethereumClient} wagmiClient={wagmiClient} />
                        <Main setMessage={setMessageFun} setIsLoading={setIsLoading} setIsUnactive={setIsUnactive} />
                        <FooterContainer />
                    </div>
                </div>
            </main>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <PopupContainer onClick={ () => { isUnactive && setIsUnactive(false) } } isShow={isUnactive} setIsUnactive={setIsUnactive} />
            <div className={classNames(s.loading, {[s.active]: isLoading})}>
                <div className={s.img}>
                    <img src={loading} alt="loading" /> 
                </div>
            </div>
            <div className={classNames(s.message, {[s.active]: message.text})}>
                {
                    message.href ? <a className={s.href} target="_blank" href={message.href}>{message.text}</a> : message.text
                }
            </div> 
        </>
    )
}

export default Home;