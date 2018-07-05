import * as _ from 'lodash';
import _characteristics from './characteristics.yml';
import _homeworlds from './homeworlds.yml';
import _backgrounds from './backgrounds.yml';
import _roles from './roles.yml';
export let characteristics = _.keyBy(_characteristics, 'id');
export let homeworlds = _.keyBy(_homeworlds, 'id');
export let backgrounds = _.keyBy(_backgrounds, 'id');
export let roles = _.keyBy(_roles, 'id');