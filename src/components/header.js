import React from 'react';
import { Navbar,Button,Alignment } from '@blueprintjs/core'
class Header extends React.Component{
    render(){
        return(
            <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading> Expense Analyser</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp3-minimal" icon="home" text="Home" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <Button className="bp3-minimal" icon="log-out" text="Logout"/>
            </Navbar.Group>
          </Navbar>
        )
    }
}

export default Header;