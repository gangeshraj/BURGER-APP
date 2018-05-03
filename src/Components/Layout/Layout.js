import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../UI/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Layout extends Component{

    constructor(props){
        super(props);
        this.state={
            sidedrawervisible:false
        }
        //console.log("in constructor",this.props);
    }

    sideDrawerClosedHandler=()=>{
        this.setState((prevstate,props)=>{
            ////console.log("props",this.props===props);
            return {
                sidedrawervisible:false
            }
        })
    }


    MenuOnToolbarTogglingSideBar=()=>{

        this.setState((prevstate,props)=>{
            ////console.log("props",this.props===props);
            return {
                sidedrawervisible:!prevstate.sidedrawervisible
            }
        })

    }

    render(){

        //console.log("inside render",this.props.isAuthenticated);
        return(
            <Auxillary>
                {/* shows toolbar which has menu component which has 
                three horizontal line on which if we click we get sidebar*/}
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleClickHandler={this.MenuOnToolbarTogglingSideBar}/>
                {/* showstaus tell sidebar to be seen or not seen
                closed make showstatus false or make sidedrawer invisible */}
                <Sidedrawer 
                    isAuth={this.props.isAuthenticated}
                    showstatus={this.state.sidedrawervisible} 
                    closed={this.sideDrawerClosedHandler}/>

                {/* The <main> tag specifies the main content of a document.

                The content inside the <main> element should be unique to the document. It should not contain
                 any content that is repeated across documents such as sidebars, navigation links, copyright 
                 rmation, site logos, and search forms.

                Note: There must not be more than one <main> element in a document. The <main> element must NOT 
                be a descendant of an <article>, <aside>, <footer>, <header>, or <nav> element.
                */}
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }    
}


const mapStateToProps=state=>{

    //console.log("what is the state",state.authReducing);

    return {
        isAuthenticated:state.authReducing.token!==null
    }

}

export default withRouter(connect(mapStateToProps)(Layout));
