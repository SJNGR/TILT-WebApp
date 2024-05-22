function LaunchApp() {
    // Launch alert message
    alert("Get ready to tilt the balance!");
    // Redirect to a different page
    window.location.href="public/TiltThisText.html";
  } 

function PageMoreInfo() {
    // Redirect to a different page
    window.location.href="public/MoreInfo.html";
}

async function processInput() {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("chatOutput");
   

// Send a POST request to the local server 
    try {
        const response = await fetch('http://localhost:3000/api/chatgpt', 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userInput })
        });

        const data = await response.json();
        const message = data.choices[0].message.content;
         responseElement.innerHTML = "Loading...";
    } 
    
    catch (error) {
        console.error('Error:', error);
        responseElement.innerHTML = 'An error occurred. Please try again.';
    }
}