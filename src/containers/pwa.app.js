import { connect } from 'react-redux';
import { create_main_data } from '../redux/actions';
import Page from '../views/home/App';

const mapStateToProps = state => {
    return {
        app: state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMainData: (data) => {
            dispatch(create_main_data(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)