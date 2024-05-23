function LaunchApp() {
    // Launch alert message
    alert("Get ready to tilt the balance!");
    // Redirect to a different page
    window.location.href="/TiltThisText.ejs";
  } 

function PageMoreInfo() {
    // Redirect to a different page
    window.location.href="/MoreInfo.ejs";
}

async function processInput() {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");
    responseElement.innerHTML = "Loading...";

// Send a POST request to the local server 
    try {
        const response = await fetch('http://localhost:3000/api/chatgpt', 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userInput })
        });
        const data = await response.json();
        
        // Recieve response. Assuming response contains the AI response in the 'choices' array with only one choice, value should be 0
        const message = data.choices[0].message.content;
        responseElement.innerHTML = message;
    } 
    
    catch (error) {
        console.error('Error:', error);
        responseElement.innerHTML = 'An error occurred. Please try again.';
    }
}