import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import './aptitudes.css';

class Aptitudes extends Component {
    renderAptitudes() {
        return this.props.aptitudes.map(a => (<p key={a}>{_.startCase(a)}</p>));
    }

    render() {
        const aptitudesNodes = this.renderAptitudes();
        return (
            <div className='aptitudes_panel'>
                <Header as="h4" attached='top'>Aptitudes</Header>
                <Segment>
                    {aptitudesNodes}
                </Segment>
            </div>
        );
    }
}

Aptitudes.propTypes = {
    aptitudes: PropTypes.array
};

function mapStateToProps(state) {
    return {
        aptitudes: state.character.aptitudes
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Aptitudes);