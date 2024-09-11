import classNames from "classnames";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import s from "./Mint.module.css";
import getWeb3 from "./getWeb3";

import Web3 from "web3";

const Mint = (props) => {
  const [number, setNumber] = useState(1);
  const [isAllowed, setIsAllowed] = useState(false);
  const [abi, setAbi] = useState([])
  const [type, setType] = useState(
    !props.typeMint
      ? 0
      : props.typeMint.toUpperCase() === "FRENSLIST MINT"
      ? 1
      : props.typeMint.toUpperCase() === "PUBLIC MINT"
      ? 2
      : 0
  );

  const minus = () => {
    if (number > 1 && type !== 0 && isAllowed && props.address)
      setNumber(number - 1);
  };

  const plus = () => {
    if (number < 5 && type !== 0 && isAllowed && props.address)
      setNumber(number + 1);
  };

  useEffect(() => {
    if (props.address) {
      const isIncludedInFrenslist = props.walletList.Frenslist.some(
        (item) => item === props.address
      );

      setIsAllowed(true);

      if (type === 1) isIncludedInFrenslist && setIsAllowed(true);
      else if (type === 2) setIsAllowed(true);
    } else if (!props.address) {
      setIsAllowed(true);
    }
  }, [props.address, props.isUploadedData, props.typeMint, props.walletList]);

  useEffect(() => {
    setType(
      !props.typeMint
        ? 0
        : props.typeMint.toUpperCase() === "FRENSLIST MINT"
        ? 1
        : props.typeMint.toUpperCase() === "PUBLIC MINT"
        ? 2
        : 0
    );
  }, [props.typeMint]);

  const contract = useRef(null);
  const web3 = useRef(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        process.env.PUBLIC_URL + "/abi.json?" + new Date().getTime()
      );
      const abi = data.data;
      setAbi(abi);
      try {
        const web = await getWeb3();
        web3.current = web;
        setCurrentAccount(await web.eth.currentProvider.selectedAddress);
        const ContractRef = new web.eth.Contract(
          abi,
          // "0xC130C695Cccb6eF0716E305adA97bF60ACfd5d25"
          "0x98AeF8E9bdBA9f4db2BF9F998478A9D16818b7ef" // Change here with your contract address
        );
        contract.current = ContractRef
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      if(!contract.current) return

      const web3 = new Web3("https://sepolia.infura.io/v3/5af80a4c29b24c009d51a66e971713e2");
      const Web3Contract = new web3.eth.Contract(
        abi,
        "0x98AeF8E9bdBA9f4db2BF9F998478A9D16818b7ef"
      );

      const balanceOf = async () =>
        await Web3Contract.methods.balanceOf(currentAccount).call(
          {
            from: currentAccount,
          },
          async (err, data) => await setBalance(data)
        );
      
      const isPublicEnable = async () =>
        await Web3Contract.methods.publicMintEnabled().call(
          {
            from: currentAccount,
          },
          async (err, data) => await setIsPublic(data)
        );

      const maxSupply = async () =>
        await Web3Contract.methods.maxSupply().call(
          {
            from: currentAccount,
          },
          async (err, data) => await setMaxSupply(data)
        );

      const totalSupply = async () =>
        await Web3Contract.methods.totalSupply().call(
          {
            from: currentAccount,
          },
          async (err, data) => await setTotalSupply(data)
        );

      await Promise.all([balanceOf(), isPublicEnable(), maxSupply(), totalSupply()]);
    })()
  }, [currentAccount, contract.current]);

  const mint = async () => {
    props.setIsLoading(true);
    if (isPublic) {
      await publicMint();
    } else {
      const result = await (
        await fetch(
          `https://merkletrees.com.rgbfrens.com/getProof?address=${currentAccount}` // Change with original link
          // `https://merkletrees.com.rgbfrens.com/getProof?address=${currentAccount}`
        )
      ).json();
      try {
        const amount = balance > 0 ? number * 0.0049 : (number - 1) * 0.0049;
        const receipt = await contract.current.methods
          .frenslistMint(number, result.hexProof)
          .send({ from: currentAccount, value: amount * 10 ** 18 })
          .on("receipt", function (receipt) {
            props.setMessage({
              text: "View your transaction on etherscan.",
              href: `https://sepolia.etherscan.io/tx/${receipt.transactionHash}`
            })
          })
          .on("error", function (error) {
            props.setMessage({
              text: "Transaction failed to mint.",
              href: null
            })
          })
          .finally(function () {
            props.setIsLoading(false);
          });
      } catch (e) {
        props.setIsLoading(false);
        props.setMessage({
          text: "Transaction failed to mint.",
          href: null
        })
      }
    }
    //window.location.reload();
  };

  const publicMint = async () => {
    try {
      const amount = number * 0.0059;
      const receipt = await contract.current.methods
        .publicMint(number)
        .send({ from: currentAccount, value: amount * 10 ** 18 })
        .on("receipt", function (receipt) {
          props.setMessage({
            text: "View your transaction on etherscan.",
            href: `https://sepolia.etherscan.io/tx/${receipt.transactionHash}`
          })
        })
        .on("error", function (error) {
          props.setMessage({
            text: "Transaction failed to mint.",
            href: null
          })
        })
        .finally(function () {
          props.setIsLoading(false);
        });
    } catch (e) {
      props.setIsLoading(false);
      props.setMessage({
        text: "Transaction failed to mint.",
        href: null
      })
    }
  };

  return (
    <div className={s.wrapper}>
      <div>
        <button
          onClick={() => {
            props.setIsUnactive(true);
          }}
          className={s.btn}
        >
          Mint info
        </button>
      </div>
      <div className={s.wrap}>
        <div className={s.info}>
          <div className={s.quantity}>{(maxSupply - totalSupply) || 0} left</div>
          <div
            className={classNames(s.status, {
              [s[`type${type}`]]: props.address,
              [s.bold]: type === 0 || !props.address,
            })}
          >
            {!props.address
              ? "Connect Wallet"
              : type === 1
              ? "FRENSLIST MINT"
              : type === 2
              ? "PUBLIC MINT"
              : "SALE NOT OPEN"}
          </div>
        </div>
        <div className={s.form}>
          <button
            onClick={minus}
            className={classNames(s.minus, {
              [s.unactive]: type === 0 || !props.address || !isAllowed,
            })}
          >
            &#8722;
          </button>
          <div className={s.number}>{number}</div>
          <button
            onClick={plus}
            className={classNames(s.plus, {
              [s.unactive]: type === 0 || !props.address || !isAllowed,
            })}
          >
            &#10010;
          </button>
        </div>
        <button
          onClick={ () => { (isAllowed && props.address) && mint() } }
          className={classNames(s.button, {
            [s.unactive]: type === 0 || !props.address || !isAllowed,
            [s.error]: !isAllowed,
          })}
        >
          {!props.isUploadedData
            ? "Loading..."
            : !isAllowed
            ? "You cannot mint during this time."
            : `Mint ${number} now`}
        </button>
      </div>
    </div>
  );
};

export default Mint;
