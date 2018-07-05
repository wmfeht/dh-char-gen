import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TopMenu extends Component {
    render() {
        return (
            <Menu fixed='top'>
                <Container>
                    <Menu.Item as='a' header>
                        WH40K Dark Heresy Character Editor
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

TopMenu.propTypes = {

};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu);