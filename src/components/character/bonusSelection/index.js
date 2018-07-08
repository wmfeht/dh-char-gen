import * as _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Button, Icon, Form, Radio, Segment } from 'semantic-ui-react';

class BonusSelection extends Component {
    render() {
        function renderOption(choice, option) {

            function optionLabel(option) {
                let result = _.startCase(option.type) + ': ' + _.startCase(option.id);
                if (option.specialty) {
                    result += ' (' + _.startCase(option.specialty) + ')';
                }
                return result;
            }

            function renderBonusText(option) {
                if (option.and) {
                    let labels = option.and.forEach(b => optionLabel(b));
                    return labels.join(', ');
                } else {
                    return optionLabel(option);
                }
            }


            return (
                <Form.Field>
                    <Radio
                        value={option.optionId}
                        key={choice.choiceId}
                        label={renderBonusText(option)}
                        checked={choice.selection === option.optionId}
                    />
                </Form.Field>
            );
        }

        function renderChoice(choice) {
            let radioButtons = choice.options.map((o) => renderOption(choice, o));

            return (
                <Form>
                    <Header attach='top' as='h4'>Choose one:</Header>
                    <Segment>
                        {radioButtons}
                    </Segment>
                </Form>
            );
        }

        const { bonusChoices, headerContent, choiceSource, isOpen, close } = this.props;
        const choiceNodes = _.chain(bonusChoices)
            .values()
            .filter(c => c.source === choiceSource)
            .map((c) => renderChoice(c))
            .value();

        return (
            <Modal open={isOpen}>
                <Header>{headerContent}</Header>
                <Modal.Content>
                    {choiceNodes}
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={close}>
                        <Icon name='checkmark' /> Done
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

BonusSelection.propTypes = {
    headerContent: PropTypes.string,
    bonusChoices: PropTypes.object,
    choiceSource: PropTypes.string,
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    chooseBonus: PropTypes.func
};

function mapStateToProps(state) {
    return {
        bonusChoices: state.character.bonusChoices
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BonusSelection);