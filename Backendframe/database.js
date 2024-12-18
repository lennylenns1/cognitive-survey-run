const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://AccessDBrunn:9Ds%4086Jt@dbrunning.shs79.mongodb.net/?retryWrites=true&w=majority&appName=DBrunning';
// Create a new MongoClient
const client = new MongoClient(uri, {
    ssl: true
});

async function insertFeedback(sessionID, runTime, mentalState, emotionalState, stressLevel, userComment) {
    try {
        await client.connect();
        const database = client.db('DBrunning');
        const collection = database.collection('RunningState');
        // Upsert the feedback data
        await collection.insertOne(
            {
                sessionID: sessionID, 
                runTime: runTime,
                mentalState: mentalState,
                emotionalState: emotionalState,
                stressLevel: stressLevel,
                userComment: userComment, 
            });
        console.log('Feedback inserted into DBfitness database from databaseJS', result);
        return result; 
    } catch (error) {
        console.error('Error inserting feedback:', error);
        throw new Error('Failed to insert feedback');
    } finally {
        await client.close();
    }
}
// Connect to the server snippet 
async function run() {
    try {
        await client.connect();
        console.log('Connected to DBrunning database');
} finally {
// Close the connection when done
    await client.close();
    console.log('DBrunning database connection closed');
}
}
run().catch(console.dir);

module.exports = { insertFeedback };


