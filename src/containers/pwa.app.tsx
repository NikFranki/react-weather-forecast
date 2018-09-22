import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { create_main_data, check_detail } from 'Src/redux/actions';
import { StoreState, EnthusiasmAction } from 'Src/types/type';
import Page from 'Src/views/home/App';

const mapStateToProps = (state: StoreState) => {
    return {
        app: state,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<EnthusiasmAction>) => {
    return {
        onCreateMainData: data => dispatch(create_main_data(data)),
        checkDetail: detail => dispatch(check_detail(detail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)