
async function processInput() {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");
    responseElement.innerHTML = "Loading...";

// Send a POST request to the local server 
    try {
        const response = await fetch('/api/chatgpt', 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userInput })
        });
        const data = await response.json();
        

        responseElement.innerHTML = data;
    } 
    
    catch (error) {
        console.error('Error:', error);
        responseElement.innerHTML = 'An error occurred. Please try again.';
    }
}