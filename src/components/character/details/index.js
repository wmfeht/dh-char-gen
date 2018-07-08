import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Grid, Input, TextArea, Form, Segment, Dropdown, Button, Popup } from 'semantic-ui-react';
import {homeworlds, backgrounds, roles} from '../../../data';
import {
    setName,
    setPlayerName,
    setHomeworld,
    setEliteAdvances,
    setGender,
    setAge,
    setBuild,
    setComplexion,
    setHair,
    setQuirks,
    setSuperstitions,
    setMementos,
    setAllies,
    setEnemies,
    setNotes,
    editHomeworldChoices,
    closeHomeworldChoices
} from '../../../actions/character';
import BonusSelection from "../bonusSelection";
import './details.css';

const nullSelection = {
    text: null,
    value: null
};

const homeworldOptions = _.keys(homeworlds).map((id) => {
    return {
        text: _.startCase(id),
        value: id
    };
});
homeworldOptions.unshift(nullSelection);

const backgroundOptions = _.keys(backgrounds).map((id) => {
    return {
        text: _.startCase(id),
        value: id
    };
});
backgroundOptions.unshift(nullSelection);

const roleOptions = _.keys(roles).map((id) => {
    return {
        text: _.startCase(id),
        value: id
    };
});
roleOptions.unshift(nullSelection);

class Details extends Component {
    handleChangeName(e) {
        this.props.setName(e.target.value);
    }

    handleChangeHomeWorld(e, {value}) {
        this.props.setHomeworld(value);
    }

    handleChangePlayerName(e) {
        this.props.setPlayerName(e.target.value);
    }

    handleChangeEliteAdvances(e) {
        this.props.setEliteAdvances(e.target.value);
    }

    handleChangeNotes(e) {
        this.props.setNotes(e.target.value);
    }

    handleChangeGender(e) {
        this.props.setGender(e.target.value);
    }

    handleChangeAge(e) {
        this.props.setAge(e.target.value);
    }

    handleChangeBuild(e) {
        this.props.setBuild(e.target.value);
    }

    handleChangeComplexion(e) {
        this.props.setComplexion(e.target.value);
    }

    handleChangeQuirks(e) {
        this.props.setQuirks(e.target.value);
    }

    handleChangeSuperstitions(e) {
        this.props.setSuperstitions(e.target.value);
    }

    handleChangeMementos(e) {
        this.props.setMementos(e.target.value);
    }

    handleChangeAllies(e) {
        this.props.setAllies(e.target.value);
    }

    handleChangeEnemies(e) {
        this.props.setEnemies(e.target.value);
    }

    handleEditHomeworldChoices() {
        this.props.editHomeworldChoices();
    }

    render() {
        const props = this.props;

        return (
            <Form className='char_details'>
                <BonusSelection
                    isOpen={props.homeworldChoicesOpen}
                    close={props.closeHomeworldChoices}
                    headerContent='Edit Homeworld Options'
                    choiceSource='HOMEWORLD'
                />
                <Header as='h4' attached='top'>Character Details</Header>
                <Segment>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Input label='Name:' inline value={props.name} onChange={_.bind(this.handleChangeName, this)} />
                                <Form.Input label='Player Name:' inline value={props.playerName} onChange={_.bind(this.handleChangePlayerName, this)} />
                                <Form.Field inline>
                                    <label>Homeworld:</label>
                                    <Dropdown options={homeworldOptions} style={{width: '63%'}} placeholder='Select Homeworld' onChange={_.bind(this.handleChangeHomeWorld, this)} />
                                    <Popup trigger={<Button size='small' icon='pencil' onClick={_.bind(this.handleEditHomeworldChoices, this)} />} content='Edit homeworld options' position='top center' />
                                </Form.Field>
                                <Form.Field inline>
                                    <label>Background:</label>
                                    <Dropdown options={backgroundOptions} style={{width: '63%'}} placeholder='Select Background' />
                                    <Popup trigger={<Button size='small' icon='pencil' />} content='Edit background options' position='top center' />
                                </Form.Field>
                                <Form.Field inline>
                                    <label>Role:</label>
                                    <Dropdown options={roleOptions} style={{width: '63%'}} placeholder='Select Role' />
                                    <Popup trigger={<Button size='small' icon='pencil' />} content='Edit role options' position='top center' />
                                </Form.Field>
                                <Form.Input label='Elite Advances:' inline value={props.eliteAdvances} onChange={_.bind(this.handleChangeEliteAdvances, this)} />
                                <Form.Field inline>
                                    <label>Divination:</label>
                                    <Input />
                                </Form.Field>
                                <Form.Field inline>
                                    <label>Notes:</label>
                                    <TextArea value={props.notes}  onChange={_.bind(this.handleChangeNotes, this)} />
                                </Form.Field>


                            </Grid.Column>
                            <Grid.Column>
                                <Form.Input label='Gender:' inline value={props.gender}  onChange={_.bind(this.handleChangeGender, this)} />
                                <Form.Input label='Age:' inline value={props.age}  onChange={_.bind(this.handleChangeAge, this)} />
                                <Form.Input label='Build:' inline value={props.build}  onChange={_.bind(this.handleChangeBuild, this)} />
                                <Form.Input label='Complexion:' inline value={props.complexion}  onChange={_.bind(this.handleChangeComplexion, this)} />
                                <Form.Input label='Quirks:' inline value={props.quirks}  onChange={_.bind(this.handleChangeQuirks, this)} />
                                <Form.Input label='Superstitions:' inline value={props.superstitions}  onChange={_.bind(this.handleChangeSuperstitions, this)} />
                                <Form.Input label='Mementos:' inline value={props.mementos}  onChange={_.bind(this.handleChangeMementos, this)} />
                                <Form.Input label='Allies:' inline value={props.allies}  onChange={_.bind(this.handleChangeAllies, this)} />
                                <Form.Input label='Enemies:' inline value={props.enemies}  onChange={_.bind(this.handleChangeEnemies, this)} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        );
    }
}

Details.propTypes = {
    name: PropTypes.string,
    setName: PropTypes.func,

    playerName: PropTypes.string,
    setPlayerName: PropTypes.func,

    eliteAdvances: PropTypes.string,
    setEliteAdvances: PropTypes.func,

    homeworld: PropTypes.string,
    background: PropTypes.string,
    role: PropTypes.string,

    gender: PropTypes.string,
    setGender: PropTypes.func,

    age: PropTypes.string,
    setAge: PropTypes.func,

    build: PropTypes.string,
    setBuild: PropTypes.func,

    complexion: PropTypes.string,
    setComplexion: PropTypes.func,

    hair: PropTypes.string,
    setHair: PropTypes.func,

    quirks: PropTypes.string,
    setQuirks: PropTypes.func,

    superstitions: PropTypes.string,
    setSuperstitions: PropTypes.func,

    mementos: PropTypes.string,
    setMementos: PropTypes.func,

    allies: PropTypes.string,
    setAllies: PropTypes.func,

    enemies: PropTypes.string,
    setEnemies: PropTypes.func,

    notes: PropTypes.string,
    setNotes: PropTypes.func,

    editHomeworldChoices: PropTypes.func,
    closeHomeworldChoices: PropTypes.func,
    homeworldChoicesOpen: PropTypes.bool,
};

function mapStateToProps(state) {
    return _.pick(state.character, ['name', 'playerName', 'eliteAdvances', 'gender', 'age', 'build', 'complexion', 'hair', 'quirks', 'superstitions', 'mementos', 'allies', 'enemies', 'notes', 'homeworldChoicesOpen']);
}

function mapDispatchToProps(dispatch) {
    return {
        setName: (value) => dispatch(setName(value)),
        setPlayerName: (value) => dispatch(setPlayerName(value)),
        setHomeworld: (value) => dispatch(setHomeworld(value)),
        setEliteAdvances: (value) => dispatch(setEliteAdvances(value)),
        setGender: (value) => dispatch(setGender(value)),
        setAge: (value) => dispatch(setAge(value)),
        setBuild: (value) => dispatch(setBuild(value)),
        setComplexion: (value) => dispatch(setComplexion(value)),
        setHair: (value) => dispatch(setHair(value)),
        setQuirks: (value) => dispatch(setQuirks(value)),
        setSuperstitions: (value) => dispatch(setSuperstitions(value)),
        setMementos: (value) => dispatch(setMementos(value)),
        setAllies: (value) => dispatch(setAllies(value)),
        setEnemies: (value) => dispatch(setEnemies(value)),
        setNotes: (value) => dispatch(setNotes(value)),
        editHomeworldChoices: () => dispatch(editHomeworldChoices()),
        closeHomeworldChoices: () => dispatch(closeHomeworldChoices())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);