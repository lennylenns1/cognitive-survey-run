document.addEventListener("DOMContentLoaded", function() {
     // Only call fetchAndDisplayFeedback if on results.html
    if (document.getElementById("feedback-container")) {
        fetchAndDisplayFeedback();  // This will now only run on results.html
    }
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackMessage = document.getElementById("feedback-message");
    const feedbackText = document.getElementById("feedback-text");
    
if (feedbackForm) {
feedbackForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    // ADDED ON 11/13TH 
    // Generate or retrieve the session ID 
    let sessionID = localStorage.getItem('sessionID');
    if (!sessionID) {
        sessionID = 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    localStorage.setItem('sessionID', sessionID);
    }

    // GET FORM DATA
    const runTime = document.getElementById("run-time").value;
    const mentalState = document.getElementById("mental-state").value;
    const emotionalState = document.getElementById("emotional-state").value;
    const stressLevel = document.getElementById("stress-level").value;
    // Capture the user's comment from the textarea
    const userComment = document.getElementById("user-comment").value;

    // Log the data to the console (for now)
    console.log("Session ID:", sessionID);
    console.log("Run Time:", runTime);
    console.log("Mental State:", mentalState);
    console.log("Emotional State:", emotionalState);
    console.log("Stress Level:", stressLevel);
    console.log("User Comment:", userComment);

    const response = await insertFeedbackToMongoDB(sessionID, runTime, mentalState, emotionalState, stressLevel, userComment);

    if (response.success) {
        console.log("Feedback saved successfully. Redirecting to results...");
        window.location.href = "/results.html";
    } else {
        console.error("Feedback submission failed.");
        feedbackText.textContent = "Error submitting feedback. Please try again.";
        feedbackMessage.style.display = "block";
    }
});
}

// DISPLAY FEEDBACK IN COMMENT POST 
function displayFeedback(feedbackData) {
    const feedbackContainer = document.getElementById("feedback-container");
    if (!feedbackContainer) {
        console.warn("Feedback container not found on feedback.html file.");
        return;
    }
    feedbackContainer.innerHTML = ""; // clear container before rendering
    feedbackData.forEach((feedback) => {
        // DIV CREATION 
        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback-post");
        // FORMAT COMMENT POST 
        feedbackDiv.innerHTML = `
            <div class="feedback-header">
                <strong>Anonymous User</strong>
            </div>
            <p><strong>Run Time:</strong> ${feedback.runTime}</p>
            <p><strong>Mental State:</strong> ${feedback.mentalState}</p>
            <p><strong>Emotional State:</strong> ${feedback.emotionalState}</p>
            <p><strong>Stress Level:</strong> ${feedback.stressLevel}</p>
            <p><strong>Comment:</strong> ${feedback.userComment || "No comment provided."}</p>
            <hr>
        `;
        feedbackContainer.appendChild(feedbackDiv);
    });
}

// ADDED NOV 23RD FOR FETCHING DATA & IF COMMENTING OUT, THE CODE WORKS 
async function fetchAndDisplayFeedback() {
    try {
        const response = await fetch('get-feedback');
        if (!response.ok) throw new Error('Failed to fetch feedback');
        const feedbackData = await response.json();
        // THIS MESSAGE IS SHOWING IN THE BROWSER'S CONSOLE. 
        console.log('Feedback Data:', feedbackData); // Add this line to check what is returned & added at 4:53pm
        if (feedbackData.length === 0) {
            console.warn('No feedback to display.');
            return;
        }
            // DISPLAY FEEDBACK 
        displayFeedback(feedbackData.feedbacks);
    } catch (error) {
        console.error('Error fetching feedback: ', error);
    }
}

// ADDED ON NOV 19TH TO SENT TO MONGODB DATABASE 
async function insertFeedbackToMongoDB(sessionID, runTime, mentalState, emotionalState, stressLevel, userComment) {
    try {
        const response = await fetch('submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionID: sessionID, 
                runTime: runTime,
                mentalState: mentalState,
                emotionalState: emotionalState,
                stressLevel: stressLevel,
                userComment: userComment, 
                customProperty: "scriptsJS",
            })
        });
        if (!response.ok) throw new Error('Failed to submit feedback');
        const data = await response.json();
        console.log('Feedback saved to MongoDB database from scriptsJS:', data);
        return data; // ADDED DEC 3RD 
    } catch (error) {
        console.error('Error saving feedback to MongoDB:', error);
        return { success: false };
    }
}
});



