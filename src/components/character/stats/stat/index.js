import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

class Stat extends Component {
    render() {
        const { statId, character } = this.props;
        return (
            <Form.Input inline label={_.startCase(statId)} value={character.characteristics[statId]} />
        );
    }
}

Stat.propTypes = {
    character: PropTypes.object,
    statId: PropTypes.string
};

function mapStateToProps(state) {
    return { character: state.character };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stat);