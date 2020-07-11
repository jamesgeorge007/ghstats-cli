const axios = require('axios');
const Conf = require('conf');
const enquirer = require('enquirer');
const showBanner = require('node-banner');
const ora = require('ora');
const Table = require('cli-table3');

const {description} = require('../package');

const config = new Conf();
const tableView = new Table();

const query = `
        query getRepo($login: String!) {
          user(login: $login) {
          	name
          	followers {
          		totalCount
          	}
          	following {
          		totalCount
          	}
            repositoriesContributedTo(contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
              totalCount
            }
            pullRequests {
              totalCount
            }
            issues {
              totalCount
            }
            organizations {
              totalCount
            }
            commitComments {
              totalCount
            }
            issueComments {
              totalCount
            }
            gists {
              totalCount
            }
          }
        }
      `;

const axiosConfig = {
	url: 'https://api.github.com/graphql',
	method: 'post',
	headers: {},
	data: {
		query
	}
};

const updateAxiosConfig = (username) => {
	axiosConfig.data.variables = {
		login: username
	};
};

const validateUserToken = async () => {
	try {
		await axios(axiosConfig);
		return true;
	} catch {
		return false;
	}
};

const toSentenceCase = (string) => {
	const result = string.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

const displayStats = async (username) => {
	await showBanner('GHStats', description);
	// Holds the items to be displayed in tabular format
	const data = [];
	let userToken = config.get('githubUserToken');

	// Validate GitHub user token
	updateAxiosConfig('jamesgeorge007');

	if (!userToken) {
		try {
			({githubUserToken: userToken} = await enquirer.prompt({
				name: 'githubUserToken',
				type: 'password',
				message: 'Please provide your GitHub user token',
				validate: async (token) => {
					if (!token) return;
					/* Check if the user token is valid
					 * and if not display the prompt again
					 */
					axiosConfig.headers.Authorization = `bearer ${token}`;
					if (!(await validateUserToken())) {
						return 'Invalid token';
					}

					return true;
				}
			}));
			config.set('githubUserToken', userToken);
		} catch (error) {
			console.log('Action Interrupted!');
			throw error;
		}
	}

	updateAxiosConfig(username);

	axiosConfig.headers.Authorization = `bearer ${userToken}`;

	const spinner = ora('Fetching details');
	spinner.start();

	let result = {};
	try {
		result = await axios(axiosConfig);
	} catch (error) {
		spinner.fail('Something went wrong');
		throw error;
	}

	spinner.stop();

	const profileStats = result.data.data.user;

	if (!profileStats) {
		spinner.fail('Invalid username');
		return;
	}

	Object.keys(profileStats)
		.filter((key) => key !== 'pinnedItems')
		.forEach((key) =>
			data.push({
				[toSentenceCase(key)]: Object.prototype.hasOwnProperty.call(
					profileStats[key],
					'totalCount'
				)
					? profileStats[key].totalCount
					: profileStats[key]
			})
		);
	tableView.push(...data);
	console.log(tableView.toString());
};

module.exports = displayStats;
