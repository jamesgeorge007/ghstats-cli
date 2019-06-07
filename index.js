#!/usr/bin/env node

'use strict'

const program = require('commander');

const basicInfo = require('./src/basic_info');
const starCount  = require('./src/star_count');
const popularRepos  = require('./src/popular_repos');
const pJSON = require('./package');

program
  .version(pJSON.version)
  .usage('<command> [options]');

program
  .command('basicinfo <username>')
  .description('Shows all the basic information regarding a user\'s GitHub profile.')
  .action(basicInfo);

program
  .command('popularrepos <username>')
  .description('Fetch the popular repostories by star count.')
  .action(popularRepos);

program
  .command('stars <username>')
  .description('Stars received for the repositories that user owns.')
  .action(starCount);

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
});

program.parse(process.argv);

if(!program.args.length){
  program.help();
}
