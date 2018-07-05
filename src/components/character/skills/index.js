import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment, Grid } from 'semantic-ui-react';
import Skill from './skill'
import './skills.css';

class Skills extends Component {
    render() {
        return (
            <div className='skills_panel'>
                <Header as="h4" attached='top'>Skills</Header>
                <Segment>
                    <Grid>
                        <Skill id='someskill' specialty='foo' level={2} />
                        <Skill id='otherskill' level={1} />
                        <Skill id='really skilled' level={4} />
                    </Grid>
                </Segment>
            </div>
        );
    }
}

Skills.propTypes = {
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
)(Skills);