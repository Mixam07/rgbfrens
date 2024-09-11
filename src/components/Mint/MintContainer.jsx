import { compose } from "redux";
import { connect } from 'react-redux';
import Mint from "./Mint";

const mapStateToProps = (state) => ({
    typeMint: state.settingsReducer.typeMint,
    address: state.settingsReducer.address,
    walletList: state.settingsReducer.walletList,
    isUploadedData: state.settingsReducer.isUploadedData
})

export default compose(
    connect(mapStateToProps, {}),
)(Mint)