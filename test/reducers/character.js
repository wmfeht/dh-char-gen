import * as _ from 'lodash';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import charReducer from '../../src/reducers/character';
import { ActionTypes } from '../../src/actions/character';
import { Dice } from 'dice-typescript';
const maxDice = new Dice({}, {
    numberBetween: (min, max) => max
});
const minDice = new Dice({}, {
    numberBetween: (min) => min
});

describe('#character-reducer', () => {
    // easy one, feral worlds have no choices
    it('Should add homeworld bonuses to state after selecting homeworld', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'feral world' });
        expect(state.homeworld).to.equal('feral world');
        let bonuses = _.values(state.bonuses);
        expect(bonuses.filter((b) => b.type === 'characteristic').length).to.equal(3);
        expect(bonuses.filter((b) => b.type === 'wounds')[0].base).to.equal('9+1d5');
        expect(state.wounds).to.be.within(minDice.roll('9+1d5'), maxDice.roll('9+1d5'));
    });
});
