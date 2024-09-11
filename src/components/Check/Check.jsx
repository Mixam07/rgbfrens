import s from "./Check.module.css";
import { useFormik } from "formik";
import validate, { lengh42 } from "../../utils/validator/validator";
import { useState } from "react";
import classNames from "classnames";

const Check = (props) => {
    const [ result, setResult ] = useState("");
    const [ status, setStatus ] = useState(null);
    const [ isSubmit, setIsSubmit ] = useState(false);

    const formik = useFormik({
        initialValues: {
            wallet: ""
        },
        validate: (values) => {
            let result;

            if(isSubmit){
                setIsSubmit(false);
                
                result = validate(values, {wallet: lengh42}).wallet;
            }

            if(result){
                setResult(result);
                setStatus(false);
            }else{
                setResult("");
                setStatus(null);
            } 

            
            return validate(values, {
                wallet: lengh42
            })
        },
        onSubmit: async (values, {resetForm} ) => {
            setResult("Your wallet is not yet registered for mint.");
            setStatus(false);

            props.walletList.Frenslist.some(item => {
                if(item === values.wallet){
                    setResult(<>You are registered for <span className={s.greenResult}>FRENSLIST</span> Mint!</>);
                    setStatus(true);
                    return true
                }
            });

            resetForm()
        },
    });

    const handleChange = (e) => {
        const maxLen = 42;

        if(e.target.defaultValue.length < maxLen ||
        (e.target.defaultValue.length === maxLen && !e.nativeEvent.data)) formik.handleChange(e)
        else formik.setFieldValue("wallet", e.target.defaultValue.slice(0, maxLen))
    }

    const handleSubmit = async (e) => {
        await setIsSubmit(true);

        formik.handleSubmit(e);
    }
    return(
        <div className={s.wrapper}>
            <div className={s.text}>Are you registered yet?</div>
            <form className={classNames(s.form, {[s.showResult]: result})} onSubmit={handleSubmit}>
                <div className={classNames(s.result, {[s.red]: status === false, [s.green]: status === true})}>
                        {result && result}
                </div>
                <input className={classNames(s.input, {[s.red]: status === false, [s.green]: status === true})} name="wallet" type="text" onChange={handleChange} value={formik.values.wallet} placeholder="Search your ETH wallet address..." />
                <div className={s.wrap}>
                    <button type="submit" className={s.button}>Browse</button>
                </div>
            </form>
        </div>
    )
}

export default Check;