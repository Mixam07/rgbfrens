import axios from "axios";

export const getSettings = async () => {
    try{
        const response = await axios.get(process.env.PUBLIC_URL + '/settings.json?' + new Date().getTime());
        const Frenslist = await axios.get(process.env.PUBLIC_URL + '/Frenslist.text?' + new Date().getTime());

        return {
            ...response.data,
            walletList: {
                Frenslist: Frenslist.data
            }
        }
    }catch(e){
        console.log(e);
    }
}