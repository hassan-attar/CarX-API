import db from '../db';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Define TypeScript interfaces for command-line arguments
interface Args {
    freshDb: boolean;
    loadSampleData: boolean;
}

// Parse command-line arguments
const argv: Args = yargs(hideBin(process.argv))
    .option('freshDb', {
        alias: 'f',
        type: 'boolean',
        description: 'Force synchronize the database to get a clean database',
        default: false,
    })
    .option('loadSampleData', {
        alias: 'l',
        type: 'boolean',
        description: 'Load sample data into the database (requires freshDb)',
        default: false,
    })
    .argv as Args;

// Function to load sample data
const loadSampleData = async () => {
    try {

        console.warn('NOT IMPLEMENTED');
    } catch (error) {
        console.error('Error loading sample data:', error);
    }
};

// Synchronize database and optionally load sample data
const synchronizeDatabase = async () => {
    try {
        await db.sequelize.sync({
            force: argv.freshDb,
            logging: console.log,
        });
        console.log('Database synchronized.');

        // Load sample data if specified
        if (argv.loadSampleData) {
            await loadSampleData();
        }

    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        await db.sequelize.close();
    }
};

if(argv.freshDb) synchronizeDatabase();
else console.log("No work to do")
