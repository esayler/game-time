
require('./player-test');
require('./collision-test');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

const expect = chai.expect;
const should = chai.should();
