import { connect } from 'react-redux';
import { create_main_data, check_detail } from '../redux/actions';
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
        },
        checkDetail: (detail) => {
            dispatch(check_detail(detail));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)