#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const program = require('commander');

const basicInfo = require('./src/info');
const starCount = require('./src/stars');
const popularRepos = require('./src/repos');
const pJSON = require('./package');

program.version(pJSON.version).usage('<command> [options]');

program
	.command('stats <username>')
	.description(
		"Shows all the basic information regarding a user's GitHub profile."
	)
	.action(basicInfo);

program
	.command('repos <username>')
	.description('Fetch the popular repostories by star count.')
	.action(popularRepos);

program
	.command('stars <username>')
	.description('Stars received for the repositories that user owns.')
	.action(starCount);

program.arguments('<command>').action(cmd => {
	program.outputHelp();
	console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`));
	console.log();
});

program.parse(process.argv);

if (!program.args.length) program.help(); // eslint-disable-line unicorn/explicit-length-check
