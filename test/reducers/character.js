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
        expect(state.wounds).to.be.within(minDice.roll('9+1d5').total, maxDice.roll('9+1d5').total);
    });

    it('Should add choices to the choices stack after selecting a homeworld', () => {
        // Forge world is the only core rules background with a choice
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        expect(_.values(state.bonusChoices).length).to.equal(1);
    });

    it('Should add homeworld bonuses to characteristics', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        expect(state.characteristics['intelligence']).to.equal(25);
        expect(state.characteristics['toughness']).to.equal(25);
        expect(state.characteristics['fellowship']).to.equal(15);
    });

    it('Should calculate the modified characteristic after setting a base characteristic', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        state = charReducer(state, { type: ActionTypes.SET_BASE_CHARACTERISTIC, id: 'intelligence', value: 10 });
        expect(state.characteristics['intelligence']).to.equal(15);
    });

    it('Should calculate the modified base characteristic after setting a characteristic', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        state = charReducer(state, { type: ActionTypes.SET_CHARACTERISTIC, id: 'intelligence', value: 10 });
        expect(state.baseCharacteristics['intelligence']).to.equal(5);
    });

    it('Should remove homeworld bonuses and choices after unsetting homeworld', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        state = charReducer(state, { type: ActionTypes.SET_HOMEWORLD, value: '' });
        expect(_.keys(state.bonusChoices).length).to.equal(0);
        expect(_.keys(state.bonuses).length).to.equal(0);
    });

    it('Should apply a homeworld aptitude', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        expect(state.aptitudes).to.eql(['intelligence']);
    });

    it('Should add bonuses from a choice', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        expect(_.keys(state.bonusChoices).length).to.equal(1);
        let choice = _.values(state.bonusChoices)[0];
        let option = _.filter(choice.options, (o) => o.id === 'technical knock')[0];
        state = charReducer(state, { type: ActionTypes.RESOLVE_CHOICE, choiceId: choice.choiceId, optionId: option.optionId });
        let bonusFromOption = _.chain(state.bonuses)
            .values()
            .filter(b => b.id ==='technical knock')
            .first()
            .value();
        expect(bonusFromOption).to.be.an('object');
    });

    it('Should remove old bonus when changing a choice', () => {
        let state = charReducer(charReducer.initialState, { type: ActionTypes.SET_HOMEWORLD, value: 'forge world' });
        expect(_.keys(state.bonusChoices).length).to.equal(1);
        let choice = _.values(state.bonusChoices)[0];
        let optionA = _.filter(choice.options, (o) => o.id === 'technical knock')[0];
        let optionB = _.filter(choice.options, (o) => o.id === 'weapon-tech')[0];
        state = charReducer(state, { type: ActionTypes.RESOLVE_CHOICE, choiceId: choice.choiceId, optionId: optionA.optionId });
        state = charReducer(state, { type: ActionTypes.RESOLVE_CHOICE, choiceId: choice.choiceId, optionId: optionB.optionId });
        let techKnockBonus = _.chain(state.bonuses)
            .values()
            .filter(b => b.id ==='technical knock')
            .first()
            .value();
        let weaponTechBonus = _.chain(state.bonuses)
            .values()
            .filter(b => b.id ==='weapon-tech')
            .first()
            .value();
        expect(techKnockBonus).to.be.an('undefined');
        expect(weaponTechBonus).to.be.an('object');
    });
});
