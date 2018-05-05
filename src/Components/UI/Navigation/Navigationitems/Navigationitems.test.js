import React from 'react';

import {configure,
shallow } //helps to render component shallowly not deeply
from 'enzyme';

///connecting enzyme to reactapp
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './Navigationitem/Navigationitem';


configure({adapter: new Adapter()});

describe('<NavigationItems/>',()=>{


    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<NavigationItems/>)
    });

    
    it('should render two <NavigationItem/> element if not authenticated',()=>{
        
            expect( wrapper.find(NavigationItem))
            .toHaveLength(2);
    });

    it('should render three <NavigationItem/> element if authenticated',()=>{

        wrapper.setProps({isAuthenticated:true})
        expect( wrapper.find(NavigationItem))
        .toHaveLength(3);
    });


    it('should render <Navigationitem link="/logout">LOG out</Navigationitem> if authenticated',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect( wrapper.contains(<NavigationItem link="/logout">LOG out</NavigationItem>)).toEqual(true);
    });


});