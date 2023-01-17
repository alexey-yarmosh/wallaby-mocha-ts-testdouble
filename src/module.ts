import lodash from 'lodash';
import dependencyA from './dependencyA';
import { dependency as dependencyB } from './dependencyB';

const dependencyAResult = dependencyA();
const module = (): number => dependencyAResult + dependencyB();
export default module;

const firstResult = lodash.first([1]);
export const first = () =>  firstResult! + lodash.first([1])!;
