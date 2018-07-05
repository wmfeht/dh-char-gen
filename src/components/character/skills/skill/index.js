import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Rating } from 'semantic-ui-react';

class Skill extends Component {
    render() {
        const { id, specialty, level } = this.props;
        let skillName = _.startCase(id);
        if (specialty) {
            skillName = skillName + ' (' + _.startCase(specialty) + ')';
        }
        return (
            <Grid.Row columns={2}>
                <Grid.Column>{skillName}</Grid.Column>
                <Grid.Column>
                    <Rating defaultRating={1} maxRating={4} rating={level} />
                </Grid.Column>
            </Grid.Row>
        );
    }
}

Skill.propTypes = {
    id: PropTypes.string,
    specialty: PropTypes.string,
    level: PropTypes.number,
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
)(Skill);