import { compose } from "redux";
import { connect } from 'react-redux';
import Home from "./Home";
import { getSettingsThunkCreator, setAddress, setStatus } from "../../redux/reducers/settings-reducer";
import { useEffect } from "react";

const HomeContainer = (props) => {
    useEffect(() => {
        props.getSettingsThunkCreator()
        setInterval(() => {
            props.getSettingsThunkCreator();
        }, 1000);
    }, [])

    return <Home {...props} />
}

const mapStateToProps = (state) => ({
    network: state.settingsReducer.network
})

export default compose(
    connect(mapStateToProps, { getSettingsThunkCreator, setAddress, setStatus }),
)(HomeContainer)