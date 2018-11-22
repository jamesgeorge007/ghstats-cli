#!/usr/bin/env node

'use strict'

const program = require('commander');
const basicInfo = require(process.cwd() + '/lib/basic_info');
const starCount = require(process.cwd() + '/lib/star_count');
const popularRepos = require(process.cwd() + '/lib/popular_repos');

program
  .version('1.0.0', '-v, --version')
  .description('Automate the unusual stuffs on GitHub');

program
  .command('basic_info')
  .option('-u --user <username>', 'Username')
  .description('Shows all the basic information regarding a user\'s GitHub profile.')
  .action(basicInfo);


program
  .command('popular_repos')
  .option('-u, --user <username>', 'Username')
  .description('Fetch the popular repostories by star count.')
  .action(popularRepos);

program
  .command('stars')
  .option('-u, --user <username>', 'Username')
  .description('Stars received for the repositories that user owns.')
  .action(starCount);

program.parse(process.argv);
