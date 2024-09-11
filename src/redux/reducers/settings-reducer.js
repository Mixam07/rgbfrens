import { getSettings } from "../../api/api";

const SET_SETTINGS = "SET-SETTINGS";
const SET_ADDRESS  = "SET-ADDRESS";
const SET_STATUS = "SET-STATUS";

const initialState = {
    socialNetworks: {
        opensea: {
            isActive: false,
            href: "#"
        },
        twitter: {
            isActive: false,
            href: "#"
        },
        discord: {
            isActive: false,
            href: "#"
        },
        etherscan: {
            isActive: false,
            href: "#"
        }
    },
    walletList: {
        Frenslist: []
    },
    info: {
        Frenslist: {
            time: "",
            price: ""
        },
        Public: {
            time: "",
            price: ""
        }
    },
    articles: [],
    typeMint: "SALE NOT OPEN",
    address: undefined,
    isUploadedData: false,
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_SETTINGS:
            return {
                ...state,
                ...action.settings,
                walletList: {
                    Frenslist: action.settings.walletList.Frenslist.split(/\s+/).filter(item => item.length === 42)
                }
            }
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address
            }
        case SET_STATUS:
            return {
                ...state,
                isUploadedData: action.bool
            }
        default:
            return state;
    }
}

export const setSettings = (settings) => ({type: SET_SETTINGS, settings});
export const setAddress = (address) => ({type: SET_ADDRESS, address});
export const setStatus = (bool) => ({type: SET_STATUS, bool});

export const getSettingsThunkCreator = () => async (dispatch) => {
    getSettings()
    .then(async result => {
        dispatch(setSettings(result))
        setTimeout(() => {
            dispatch(setStatus(true))
        }, 1)
    });
}

export default settingsReducer;