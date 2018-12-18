#!/usr/bin/env node

'use strict'

const fetch = require('isomorphic-unfetch');
const program = require('commander'); 
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const clear = require('clear');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');

const  basicInfo = require('./lib/basic_info');
const  starCount  = require('./lib/star_count');
const  popularRepos  = require('./lib/popular_repos');
const  versionInfo = require('./lib/version_info');

program
  .command('version')
  .description('Shows basic information such as version-info and development environment details')
  .action(versionInfo);

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

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
})

program.parse(process.argv);

if(!program.args.length){
  program.help();
}