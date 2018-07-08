import * as _ from 'lodash';
import uuid from 'uuid/v4';
import {Dice} from 'dice-typescript'
import {characteristics, homeworlds} from '../data';
import {ActionTypes} from '../actions/character';

const dice = new Dice();
const maxDice = new Dice({}, {
    numberBetween: (min, max) => max
});
const minDice = new Dice({}, {
    numberBetween: (min) => min
});

const BonusSource = {
    HOMEWORLD: 'HOMEWORLD',
    BACKGROUND: 'BACKGROUND',
    CHOICE: 'CHOICE',
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
    characteristics: _.mapValues(characteristics, (() => 20)),
    baseCharacteristics: _.mapValues(characteristics, (() => 20)),
    wounds: 0,
    bonuses: {},
    bonusChoices: {},
    aptitudes: [],
    homeworldChoicesOpen: false
};

// Bonus retrieval utils

// Get the base wounds expression
function getBaseWounds(state) {
    const bonuses = _.values(state.bonuses);
    return _.chain(bonuses)
        .filter(b => b.type === 'wounds' && !!b.base)
        .map(b => b.base)
        .first();
}

// Calculate the total modifiers to a characteristic
function getCharacteristicMod(state, characteristic) {
    const bonuses = _.values(state.bonuses);
    return _.chain(bonuses)
        .filter(b => b.type === 'characteristic' && b.id === characteristic && !!b.mod)
        .map(b => _.parseInt(b.mod))
        .sum();
}

// Recalc the modded characteristic (like after a homeworld change)
function recalcCharacteristicMods(state) {
    state.characteristics = _.mapValues(state.baseCharacteristics, (v, k) => v + getCharacteristicMod(state, k));
}

// Recalc aptitudes
function recalcAptitudes(state) {
    state.aptitudes = _.chain(state.bonuses)
        .values()
        .filter(b => b.type === 'aptitude')
        .map(b => b.id)
        .uniq()
        .value();
}

function handleBonusNode(node, state, source) {
    if (node.and) {
        node.and.forEach((subNode) => {
            handleBonusNode(subNode, state, source);
        });
    } else if (node.or) {
        const choiceId = uuid();
        const choiceOptions = node.or.map(o => _.merge({optionId: uuid()}, o));
        const choice = {
            choiceId: choiceId,
            options: choiceOptions,
            source: source
        };
        state.bonusChoices[choiceId] = choice;
    } else {
        const bonusId = uuid();
        const bonus = _.merge({ bonusId: bonusId, source: source }, node);
        state.bonuses[bonusId] = bonus;
    }
}

// Resolve a choice and add appropriate bonuses, also cleanup old option if we're changing and existing selection
function resolveChoice(state, choiceId, optionId) {
    state = _.cloneDeep(state);
    const choice = state.bonusChoices[choiceId];

    // Remove previous selection if it exists
    if (choice.selection) {
        state.bonuses = _.omitBy(state.bonuses, (b) => b.choiceId === choiceId);
    }
    choice.selection = optionId;

    function addBonus(bonus) {
        const bonusId = uuid();
        bonus.choice = choiceId;
        state.bonuses[bonus.bonusId] = _.merge({}, { bonusId, choiceId, source: BonusSource.CHOICE }, bonus);
    }

    const option = _.filter(choice.options, o => o.optionId === optionId)[0];

    if (option.and) {
        option.and.forEach(b => addBonus(b));
    } else {
        addBonus(option);
    }

    return state;
}

// Set the homeworld
function setHomeworld(state, homeworldId) {
    // Copy state object
    state = _.cloneDeep(state);

    let homeworld = _.cloneDeep(homeworlds[homeworldId]);
    homeworld.bonuses.forEach(b => handleBonusNode(b, state, BonusSource.HOMEWORLD));

    // reset wounds on world change
    const baseWounds = getBaseWounds(state);
    state.wounds = dice.roll(String(baseWounds)).total;

    //set name
    state.homeworld = homeworldId;
    recalcCharacteristicMods(state);
    recalcAptitudes(state);
    return state;
}

//Unset all the homeworld things
function clearHomeworld(state) {
    state = _.cloneDeep(state);
    // Grab choice bonus ids
    const choiceIds = _.chain(state.bonusChoices)
        .values()
        .filter(c => c.source === BonusSource.HOMEWORLD)
        .map(c => c.options.map(o => o.choiceId));

    // Remove homeworld choices
    state.bonusChoices = _.omitBy(state.bonusChoices, (c) => c.source === BonusSource.HOMEWORLD);
    // Remove bonuses from homeworld and choices
    state.bonuses = _.omitBy(state.bonuses, (b) => _.includes(choiceIds, b.choiceId) || b.source === BonusSource.HOMEWORLD);
    state.homeworld = '';
    recalcCharacteristicMods(state);
    recalcAptitudes(state);
    return state;
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SET_CHARACTERISTIC:
        if(!/^\d*$/.test(action.value) || action.value >= 99) {
            return state;
        }
        return _.merge({}, state, {
            baseCharacteristics: {
                [action.id]: action.value - getCharacteristicMod(state, action.id)
            },
            characteristics: {
                [action.id]: _.trimStart(action.value, ['0'])
            }
        });
    case ActionTypes.SET_BASE_CHARACTERISTIC:
        if (!_.isNumber(action.value)) {
            return state;
        }
        return _.merge({}, state, {
            baseCharacteristics: {
                [action.id]: _.parseInt(action.value)
            },
            characteristics: {
                [action.id]: action.value + getCharacteristicMod(state, action.id)
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
        state = clearHomeworld(state);
        if (!_.isEmpty(action.value)) {
            return setHomeworld(state, action.value);
        } else {
            // If the value is empty, clear bonuses etc. and return
            return state;
        }
    case ActionTypes.EDIT_HOMEWORLD_CHOICES:
        return _.merge({}, state, { homeworldChoicesOpen: true });
    case ActionTypes.CLOSE_HOMEWORLD_CHOICES:
        return _.merge({}, state, { homeworldChoicesOpen: false });
    case ActionTypes.RESOLVE_CHOICE:
        return resolveChoice(state, action.choiceId, action.optionId);
    default:
        return state;
    }
}

reducer.initialState = initialState;