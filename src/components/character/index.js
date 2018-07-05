import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {rollCharacteristics} from '../../actions/character';
import { Button, Container, Grid } from 'semantic-ui-react';
import Details from './details';
import Stats from './stats';
import Aptitudes from './aptitudes';
import Skills from './skills';
import Talents from './talents';

class Character extends Component {
    render() {
        return (
            <Container style={{marginTop: '7em'}}>
                <Details/>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Stats />
                            <Aptitudes />
                        </Grid.Column>
                        <Grid.Column>
                            <Skills />
                            <Talents />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

Character.propTypes = {
    characteristics: PropTypes.object,
    rollCharacteristics: PropTypes.func
};

function mapStateToProps(state) {
    return state.character;
}

function mapDispatchToProps(dispatch) {
    return {
        rollCharacteristics: () => rollCharacteristics(dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Character);