import { compose } from "redux";
import { connect } from 'react-redux';
import About from "./About";

const mapStateToProps = (state) => ({
    articles: state.settingsReducer.articles
})

export default compose(
    connect(mapStateToProps, {}),
)(About)