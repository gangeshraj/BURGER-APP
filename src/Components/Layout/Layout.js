import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../UI/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{

    constructor(props){
        super(props);
        this.state={
            sidedrawervisible:true
        }
        console.log("in constructor",this.props);
    }

    sideDrawerClosedHandler=()=>{

        this.setState((prevstate,props)=>{
            //console.log("props",this.props===props);
            return {
                sidedrawervisible:false
            }
        })

    }

    render(){

        return(
            <Auxillary>
                <Toolbar/>
                <Sidedrawer 
                    showstatus={this.state.sidedrawervisible} 
                    closed={this.sideDrawerClosedHandler}/>
                <div>toolbar ,sidebarsssss , backdrop</div>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }    
}

export default Layout;
