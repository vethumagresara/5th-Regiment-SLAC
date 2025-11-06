// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    let soldierData = []; // This will hold all 500 soldiers
    const searchButton = document.getElementById('search-button');
    const searchBox = document.getElementById('search-box');
    const profileDisplay = document.getElementById('profile-display');

    // 1. Load the soldier data from your JSON file
    fetch('soldiers.json')
        .then(response => response.json())
        .then(data => {
            soldierData = data;
            console.log("Soldier data loaded successfully.");
        })
        .catch(error => {
            console.error("Error loading soldier data:", error);
            profileDisplay.innerHTML = `<p style="color: red;">Error: Could not load soldier data. Make sure 'soldiers.json' exists.</p>`;
        });

    // 2. Add click event to the search button
    searchButton.addEventListener('click', performSearch);

    // 3. Add 'Enter' key press event to the search box
    searchBox.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    // 4. The main search function
    function performSearch() {
        const searchTerm = searchBox.value.trim(); // Get text from search box
        
        if (searchTerm === "") {
            profileDisplay.innerHTML = `<p id="message">Please enter a service number.</p>`;
            return;
        }

        // Find the soldier in the loaded data
        const foundSoldier = soldierData.find(soldier => soldier.serviceNumber === searchTerm);

        if (foundSoldier) {
            // If found, display the profile
            displayProfile(foundSoldier);
        } else {
            // If not found, show a message
            profileDisplay.innerHTML = `<p id="message" style="color: red;">No soldier found with service number: ${searchTerm}</p>`;
        }
    }

    // 5. The function to display the profile HTML
    function displayProfile(soldier) {
        // 'soldier' is the object from your JSON file
        const html = `
            <div class="profile-card">
                <img src="${soldier.profilePic}" alt="Profile Picture" class="profile-pic">
                <div class="profile-info">
                    <h2>${soldier.name}</h2>
                    <p><strong>Rank:</strong> ${soldier.rank}</p>
                    <p><strong>Service Number:</strong> ${soldier.serviceNumber}</p>
                    
                    <a href="${soldier.pdfLink}" target="_blank" class="pdf-button">
                        View Personal Detail File
                    </a>
                </div>
            </div>
        `;
        
        profileDisplay.innerHTML = html;
    }
});