import axios from 'axios';
import { exit } from 'process';
require('dotenv').config();

const domain = process.env.HOMEBOY_DOMAIN;
if (!domain) {
  throw new Error('HOMEBOY_DOMAIN env variable missing!');
}

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY env variable missing!');
}

axios.defaults.headers['Authorization'] = `Bearer ${process.env.API_KEY}`;

type CommandType = 'update_bills' | 'help' | 'clear_unpaired_files' | 'update_file_sizes';

async function main() {
  const [command, arg] = process.argv.slice(2) as [CommandType, string];

  switch (command) {
    case 'update_file_sizes':
      {
        await axios
          .post(`${domain}/api/admin/update_file_sizes`)
          .then(res => console.log(res))
          .catch(err => console.log(err.message));
      }
      break;

    case 'update_bills':
      {
        if (arg === 'property') {
          await axios
            .post(`${domain}/api/admin/properties/update_bills`)
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err.message));
        } else {
          console.log('Unsupported arg: ' + arg);
        }
      }
      break;

    case 'clear_unpaired_files':
      {
        await axios
          .post(`${domain}/api/admin/clear_unpaired_files`)
          .then(res => console.log(res.data))
          .catch(err => console.log(err.message));
      }
      break;

    case 'help':
    default: {
      console.log('Available homeboy commands:');
      console.log(
        'clear_unpaired_files -- Deletes all files from disk, that do not have a database entry.'
      );
      console.log(
        'update_bills <arg> -- Updates the bill with stamp <arg> to unpaid, when they are about to be due.'
      );

      console.log('help -- Display help.');
    }
  }
}

main()
  .then(() => exit(0))
  .catch(err => console.log(err.message));
