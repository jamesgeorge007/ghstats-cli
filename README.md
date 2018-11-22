[![NPM](https://nodei.co/npm/ghstats-cli.png)](https://nodei.co/npm/ghstats-cli/)

[![npm version](https://badge.fury.io/js/ghstats-cli.svg)](https://badge.fury.io/js/ghstats-cli) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)

<h1 align="center"> GHstats-cli </h1>

> A CLI utility to automate unusual tasks of GitHub.

## Basic Info

All those packages that you may come across among those cli tools or simliar sought of libraries will be performing just those data fetching part from the REST API which makes no sense. I made an attempt to fetch couple of unusual stuffs unseen in those pre-available tools as mentioned above such as counting up the stars the user has received for his repositories excluding the forks. It involves implementations in the programmatic way rather than normal data fetching stuff say, fetching the star count for source repositories require couple of array manipulations.

## *Installation*

`npm install ghstats-cli`

![Demo](https://github.com/jamesgeorge007/ghstats-cli/blob/master/assets/screencast.gif)

## *Features*

- [x] Basic profile information.
- [x] List the popular repositories by star count.
- [x] Get to know the star count that the user has for his source repositories.

## *Usage*

```js
	ghstats-cli info -u <username>

	ghstats-cli popular_repos -u <username>

	ghstats-cli stars -u <username>
```
