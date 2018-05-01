import React,{Component} from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component{

    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return <Redirect to="/" />;
    }

}


const mapDispatchToProps=dispatch=>{

    return {
        onLogout: ()=>dispatch(actions.logout())
    }

};

export default withRouter(connect(null,mapDispatchToProps)(Logout));