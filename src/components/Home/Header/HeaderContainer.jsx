import { compose } from "redux";
import { connect } from 'react-redux';
import { setAddress } from "../../../redux/reducers/settings-reducer";
import Header from "./Header";

const mapStateToProps = (state) => ({
    walletList: state.settingsReducer.walletList,
    address: state.settingsReducer.address
})

export default compose(
    connect(mapStateToProps, { setAddress }),
)(Header)