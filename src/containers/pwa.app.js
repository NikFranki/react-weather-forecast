import { connect } from 'react-redux';
import { Say_Hello } from '../redux/actions';
import Page from '../views/App';

const mapStateToProps = state => {
    return {
        app: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSay: () => {
            dispatch(Say_Hello())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)