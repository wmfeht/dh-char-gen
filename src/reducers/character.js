import * as _ from 'lodash';
import {characteristics} from '../data';
import {ActionTypes} from '../actions/character';

const initialState = {
    name: '',
    playerName: '',
    homeworld: '',
    background: '',
    role: '',
    eliteAdvances: '',
    notes: '',
    gender: '',
    age: '',
    build: '',
    complexion: '',
    quirks: '',
    superstitions: '',
    mementos: '',
    allies: '',
    enemies: '',
    characteristics: _.mapValues(characteristics, (() => 0))
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SET_CHARACTERISTIC:
        return _.merge({}, state, {
            characteristics: {
                [action.id]: action.value
            }
        });
    case ActionTypes.SET_NAME:
        return _.merge({}, state, {
            name: action.value
        });
    case ActionTypes.SET_PLAYER_NAME:
        return _.merge({}, state, {
            playerName: action.value
        });
    case ActionTypes.SET_ELITE_ADVANCES:
        return _.merge({}, state, {
            eliteAdvances: action.value
        });
    case ActionTypes.SET_AGE:
        if (!/^\d*$/.test(action.value)) {
            return state;
        }
        return _.merge({}, state, {
            age: action.value
        });
    case ActionTypes.SET_GENDER:
        return _.merge({}, state, {
            gender: action.value
        });

    case ActionTypes.SET_NOTES:
        return _.merge({}, state, {
            notes: action.value
        });

    case ActionTypes.SET_BUILD:
        return _.merge({}, state, {
            build: action.value
        });

    case ActionTypes.SET_COMPLEXION:
        return _.merge({}, state, {
            complexion: action.value
        });

    case ActionTypes.SET_HAIR:
        return _.merge({}, state, {
            hair: action.value
        });

    case ActionTypes.SET_QUIRKS:
        return _.merge({}, state, {
            quirks: action.value
        });
    case ActionTypes.SET_SUPERSTITIONS:
        return _.merge({}, state, {
            superstitions: action.value
        });
    case ActionTypes.SET_MEMENTOS:
        return _.merge({}, state, {
            mementos: action.value
        });
    case ActionTypes.SET_ALLIES:
        return _.merge({}, state, {
            allies: action.value
        });
    case ActionTypes.SET_ENEMIES:
        return _.merge({}, state, {
            enemies: action.value
        });
    default:
        return state;
    }
}
