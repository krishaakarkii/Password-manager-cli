const yargs = require('yargs');
const { addPassword, getPassword, deletePassword } = require('./fileIO');

// Add password command
yargs.command({
  command: 'add',
  describe: 'Add a new password',
  builder: {
    name: {
      describe: 'Name of the service',
      demandOption: true,
      type: 'string',
    },
    password: {
      describe: 'Password for the service',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    addPassword(argv.name, argv.password);
  },
});

// Get password command
yargs.command({
  command: 'get',
  describe: 'Retrieve the password for a service',
  builder: {
    name: {
      describe: 'Name of the service',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    getPassword(argv.name);
  },
});

// Delete password command
yargs.command({
  command: 'delete',
  describe: 'Delete a password',
  builder: {
    name: {
      describe: 'Name of the service',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deletePassword(argv.name);
  },
});

yargs.parse();
