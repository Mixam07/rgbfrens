import { compose } from "redux";
import { connect } from 'react-redux';
import Popup from "./Popup";

const mapStateToProps = (state) => ({
    info: state.settingsReducer.info
})

export default compose(
    connect(mapStateToProps, {}),
)(Popup)