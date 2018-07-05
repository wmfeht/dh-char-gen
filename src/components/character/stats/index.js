import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Form, Header, Button, Icon, Segment } from 'semantic-ui-react';
import Stat from './stat';
import './stats.css';
import {rollCharacteristics} from '../../../actions/character';

class Stats extends Component {
    componentDidMount() {
        this.props.rollCharacteristics();
    }

    handleReRollStats() {
        this.props.rollCharacteristics();
    }

    render() {
        return (
            <Form className='stats_panel'>
                <Header as='h4' attached='top'>
                    Characteristics
                </Header>
                <Segment>
                    <Grid divided='vertically'>
                        <Grid.Row columns={3}>
                            <Grid.Column width={7}>
                                <Stat statId='weapon skill' />
                                <Stat statId='ballistic skill' />
                                <Stat statId='strength' />
                                <Stat statId='toughness' />
                                <Stat statId='agility' />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Stat statId='intelligence' />
                                <Stat statId='perception' />
                                <Stat statId='willpower' />
                                <Stat statId='fellowship' />
                                <Stat statId='influence' />
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <div style={{textAlign: 'right'}}>
                                    <Button icon='refresh' color='teal' onClick={_.bind(this.handleReRollStats, this)} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        );
    }
}

Stats.propTypes = {
    character: PropTypes.object,
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
)(Stats);