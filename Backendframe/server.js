const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://AccessDBrunn:9Ds%4086Jt@dbrunning.shs79.mongodb.net/?retryWrites=true&w=majority&appName=DBrunning';
// Create a new MongoClient
const client = new MongoClient(uri, {
    ssl: true
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'Frontendframe'))); // Adjust 'frontend' if needed
// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors()); // This will allow all origins. 
app.use(express.json());

// initialize mongodb when server starts and it keeps it open
async function connectDB() {
    try {
        await client.connect(); // Connect to MongoDB
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the application if connection fails
    }
}
connectDB();

// CONNECT TO MONGODB DATABASE 
async function insertFeedback(sessionID, runTime, mentalState, emotionalState, stressLevel, userComment) {
    try {
        await client.connect();
        const database = client.db('DBrunning');
        const collection = database.collection('RunningState');
        // DATA BELOW IS SENT TO MONGODB DATABASE COLLECTION 
        const result = await collection.insertOne(
            {
                sessionID: sessionID, 
                runTime: runTime,
                mentalState: mentalState,
                emotionalState: emotionalState,
                stressLevel: stressLevel,
                userComment: userComment, 
                customProperty: "serverJS", //{ $exists: true }, //THIS TEST IF THE FIELD EXIST 
            });
            // MESSAGE BELOW SHOWS IN THE VS CODE TERMINAL 
        console.log('insertFeedback data inserted into DBrunning database from serverJS ');
        return result; 
    } catch (error) {
        console.error('Error inserting feedback:', error);
        throw error; 
    }
}

// Added a default route to feedback.html 
app.get('/', (_req, res) => {
    console.log('Serving feedback.html'); 
    res.sendFile(path.join(__dirname, 'Frontendframe', 'feedback.html' ));
});

app.get('/test', (_req, res) => {
    res.send('Test route working');
});

// GET /get-feedback
// FETCHING DATA BACK FROM MONGODB
app.get('/get-feedback', async ( _, res) => {
    try {
        const database = client.db('DBrunning');
        const collection = database.collection('RunningState');
        // FETCH ALL FEEDBACK, SORTED BY NEWEST FIRST 
        const feedbackData = await collection.find().sort({ _id: -1 }).toArray();
         // THIS IS SHOWING IN THE VS CODE TERMINAL. 
        console.log('Fetched Feedback:', feedbackData);
        res.status(200).json({ success: true, feedbacks: feedbackData });
    } catch (error) {
    console.error('Error fetching feedback: ', error);
        res.status(500).json({ success: false, message: 'Failed to fetch feedback' });
    }
}); 

app.get('/submit-feedback', (_, res) => {
    res.send('This endpoint is for submitting feedback via POST requests. Please use the survey form.');
});

// POST /submit-feedback
// Example route handling in your server file 
app.post('/submit-feedback', async (req, res) => {
    try {
    // Extract data from the request body
        const { sessionID, runTime, mentalState, emotionalState, stressLevel, userComment } = req.body;
    // Save the feedback to MongoDB 
        const result = await insertFeedback(sessionID, runTime, mentalState, emotionalState, stressLevel, userComment);
    if (result && result.acknowledged) {
        res.status(200).json({ success: true, message: 'Feedback saved/Post to the MongoDB database from serverJS successfully!' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to save feedback' });
    }
} catch (error) {
    // Handle errors 
    console.error('Error in /submit-feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to save feedback "serverJS"' });
}
});
// close the client when the server shuts down 
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Serving static files from: ${path.join(__dirname, 'Frontendframe')}`);
});



