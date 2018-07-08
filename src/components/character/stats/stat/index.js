import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import './stat.css';
import {setCharacteristic} from '../../../../actions/character';

class Stat extends Component {
    handleChangeStat(e, {value}) {
        this.props.setCharacteristic(this.props.statId, value);
    }

    render() {
        const { statId, character } = this.props;
        const characteristic = character.characteristics[statId];
        const baseCharacteristic = character.baseCharacteristics[statId];
        const isBuffed = characteristic > baseCharacteristic;
        const isDebuffed = baseCharacteristic > characteristic;
        let cls = '';
        if (isBuffed) {
            cls='buffed';
        } else if (isDebuffed) {
            cls='debuffed';
        }
        return (
            <div className='stat_display'>
                <Form.Input inline label={_.startCase(statId)} value={characteristic} className={cls} onChange={_.bind(this.handleChangeStat, this)} />
            </div>
        );
    }
}

Stat.propTypes = {
    character: PropTypes.object,
    statId: PropTypes.string,
    setCharacteristic: PropTypes.func
};

function mapStateToProps(state) {
    return { character: state.character };
}

function mapDispatchToProps(dispatch) {
    return {
        setCharacteristic: (statId, value) => dispatch(setCharacteristic(statId, value))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stat);