import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import './talents.css';

class Talents extends Component {
    render() {
        return (
            <div className='talents_panel'>
                <Header as="h4" attached='top'>Talents</Header>
                <Segment>
                    <p>Sometalent</p>
                    <p>Someothertalent</p>
                    <p>Yetanothertalent</p>
                </Segment>
            </div>
        );
    }
}

Talents.propTypes = {
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
)(Talents);