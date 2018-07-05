import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import './aptitudes.css';

class Aptitudes extends Component {
    render() {
        return (
            <div className='aptitudes_panel'>
                <Header as="h4" attached='top'>Aptitudes</Header>
                <Segment>
                    <p>foo</p>
                    <p>bar</p>
                    <p>baz</p>
                </Segment>
            </div>
        );
    }
}

Aptitudes.propTypes = {
};

function mapStateToProps(state) {
    return state.character;
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Aptitudes);