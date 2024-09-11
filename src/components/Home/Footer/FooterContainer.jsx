import { compose } from "redux";
import { connect } from 'react-redux';
import Footer from "./Footer";

const mapStateToProps = (state) => ({
    socialNetworks: state.settingsReducer.socialNetworks,
})

export default compose(
    connect(mapStateToProps, {}),
)(Footer)