#!/usr/bin/env node

'use strict';

const program = require('commander');

const displayStats = require('./src/info');
const {version} = require('./package');

program
	.version(version)
	.arguments('<username>')
	.action((username) => displayStats(username));

program.parse(process.argv);
