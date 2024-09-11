import { compose } from "redux";
import { connect } from 'react-redux';
import { getSettingsThunkCreator } from "../../redux/reducers/settings-reducer";
import Check from "./Check";

const mapStateToProps = (state) => ({
    walletList: state.settingsReducer.walletList
})

export default compose(
    connect(mapStateToProps, { getSettingsThunkCreator }),
)(Check)