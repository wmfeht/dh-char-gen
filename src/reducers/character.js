import * as _ from 'lodash';
import uuid from 'uuid/v4';
import {Dice} from 'dice-typescript'
import {characteristics, homeworlds} from '../data';
import {ActionTypes} from '../actions/character';

const dice = new Dice();

const BonusSource = {
    HOMEWORLD: 'HOMEWORLD',
    BACKGROUND: 'BACKGROUND',
    ROLE: 'ROLE',
    ADVANCE: 'ADVANCE'
};

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
    characteristics: _.mapValues(characteristics, (() => 0)),
    wounds: 0,
    bonuses: {},
    bonuseChoices: {}
};

// Bonus retrieval utils
function getBaseWounds(state) {
    const bonuses = _.values(state.bonuses);
    return _.chain(bonuses)
        .filter(b => b.type === 'wounds' && !!b.base)
        .map(b => b.base)
        .first();
}


function setHomeworld(state, homeworldId) {
    // Copy state object
    state = _.cloneDeep(state);

    function handleNode(node) {
        if (node.and) {
            node.and.forEach((subNode) => {
                handleNode(subNode);
            });
        } else if (node.or) {
            const choiceId = uuid();
            state.choices[choiceId] = [node.or];
            state.choices[choiceId].source = BonusSource.HOMEWORLD;
        } else {
            const bonusId = uuid();
            state.bonuses[bonusId] = node;
            state.bonuses[bonusId].source = BonusSource.HOMEWORLD;
        }
    }

    let homeworld = _.cloneDeep(homeworlds[homeworldId]);
    homeworld.bonuses.forEach(handleNode);

    // reset wounds on world change
    const baseWounds = getBaseWounds(state);
    state.wounds = dice.roll(String(baseWounds));
    console.log(state.wounds);

    //set name
    state.homeworld = homeworldId;

    return state;
}

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
    case ActionTypes.SET_HOMEWORLD:
        return setHomeworld(state, action.value);
    default:
        return state;
    }
}

reducer.initialState = initialState;