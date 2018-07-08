import * as _ from 'lodash';
import {Dice} from 'dice-typescript';
import { characteristics } from '../data';

const dice = new Dice();

export let ActionTypes = {
    // Fluff
    SET_NAME: 'SET_NAME',
    SET_PLAYER_NAME: 'SET_PLAYER_NAME',
    SET_ELITE_ADVANCES: 'SET_ELITE_ADVANCES',
    SET_AGE: 'SET_AGE',
    SET_GENDER: 'SET_GENDER',
    SET_NOTES: 'SET_NOTES',
    SET_BUILD: 'SET_BUILD',
    SET_COMPLEXION: 'SET_COMPLEXION',
    SET_HAIR: 'SET_HAIR',
    SET_QUIRKS: 'SET_QUIRKS',
    SET_SUPERSTITIONS: 'SET_SUPERSTITIONS',
    SET_MEMENTOS: 'SET_MEMENTOS',
    SET_ALLIES: 'SET_ALLIES',
    SET_ENEMIES: 'SET_ENEMIES',
    SET_HOMEWORLD: 'SET_HOMEWORLD',

    EDIT_HOMEWORLD_CHOICES: 'EDIT_HOMEWORLD_CHOICES',
    CLOSE_HOMEWORLD_CHOICES: 'CLOSE_HOMEWORLD_CHOICES',

    // Stats and stuff
    ROLL_CHARACTERISTICS: 'ROLL_CHARACTERISTICS',
    ROLL_CHARACTERISTIC: 'ROLL_CHARACTERISTIC',
    SET_CHARACTERISTIC: 'SET_CHARACTERISTIC',
    SET_BASE_CHARACTERISTIC: 'SET_BASE_CHARACTERISTIC',

    // Bonuse choices
    RESOLVE_CHOICE: 'RESOLVE_CHOICE'
};

export function rollCharacteristics(dispatch) {
    _.keys(characteristics).forEach(id => {
        rollCharacteristic(dispatch, id);
    });
}

export function rollCharacteristic(dispatch, id) {
    let value = dice.roll(characteristics[id].base).total;
    dispatch(setBaseCharacteristic(id, value));
}

export function setCharacteristic(id, value) {
    return {
        type: ActionTypes.SET_CHARACTERISTIC,
        id,
        value
    };
}

export function setBaseCharacteristic(id, value) {
    return {
        type: ActionTypes.SET_BASE_CHARACTERISTIC,
        id,
        value
    };
}

export function setName(value) {
    return {
        type: ActionTypes.SET_NAME,
        value
    };
}

export function setPlayerName(value) {
    return {
        type: ActionTypes.SET_PLAYER_NAME,
        value
    };
}

export function setHomeworld(value) {
    return {
        type: ActionTypes.SET_HOMEWORLD,
        value
    };
}

export function setEliteAdvances(value) {
    return {
        type: ActionTypes.SET_ELITE_ADVANCES,
        value
    };
}


export function setGender(value) {
return {
        type: ActionTypes.SET_GENDER,
        value
    };
}

export function setAge(value) {
    return {
        type: ActionTypes.SET_AGE,
        value
    };
}

export function setNotes(value) {
    return {
        type: ActionTypes.SET_NOTES,
        value
    };
}

export function setBuild(value) {
    return {
        type: ActionTypes.SET_BUILD,
        value
    };
}

export function setComplexion(value) {
    return {
        type: ActionTypes.SET_COMPLEXION,
        value
    };
}

export function setHair(value) {
    return {
        type: ActionTypes.setHair,
        value
    };
}


export function setQuirks(value) {
    return {
        type: ActionTypes.SET_QUIRKS,
        value
    };
}

export function setSuperstitions(value) {
    return {
        type: ActionTypes.SET_SUPERSTITIONS,
        value
    };
}

export function setMementos(value) {
    return {
        type: ActionTypes.SET_MEMENTOS,
        value
    };
}

export function setAllies(value) {
    return {
        type: ActionTypes.SET_ALLIES,
        value
    };
}

export function setEnemies(value) {
    return {
        type: ActionTypes.SET_ENEMIES,
        value
    };
}

export function editHomeworldChoices() {
    return {
        type: ActionTypes.EDIT_HOMEWORLD_CHOICES
    };
}

export function closeHomeworldChoices() {
    return {
        type: ActionTypes.CLOSE_HOMEWORLD_CHOICES
    };
}

export function chooseBonus(choiceId, optionId) {
    return {
        type: ActionTypes.RESOLVE_CHOICE,
        choiceId,
        optionId
    };
}

