document.addEventListener('DOMContentLoaded', () => {
    const addRecipeForm = document.getElementById('addRecipeForm');
    const recipeDisplay = document.getElementById('recipe-display');
    let recipes = []; // Array to store recipes

    addRecipeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipeName').value.trim();
        const recipeDescription = document.getElementById('recipeDescription').value.trim();
        const recipeImageInput = document.getElementById('recipeImage');

        // Input validation
        if (recipeName === "" || recipeDescription === "" || !recipeImageInput.files.length) {
            logMessage('error');
            return;
        }

        const recipeImageFile = recipeImageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const recipeData = {
                name: recipeName,
                description: recipeDescription,
                image: event.target.result
            };
            recipes.push(recipeData); // Add new recipe to the list
            displayRecipes(); // Display all recipes
            logMessage('success');

            // Clear the form
            addRecipeForm.reset();
        };

        reader.readAsDataURL(recipeImageFile);
    });

    function displayRecipes() {
        // Clear existing recipes in the display
        recipeDisplay.innerHTML = '';

        // Iterate through recipes
        recipes.forEach((recipeData, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <h3>${recipeData.name}</h3>
                <p>${recipeData.description}</p>
                <img src="${recipeData.image}" alt="${recipeData.name}">
                <button class="delete-recipe" data-index="${index}">Delete Recipe</button>
            `;

            // Append each recipe card to Display
            recipeDisplay.appendChild(recipeCard);
        });

        // Add Delete buttons to each recipe
        document.querySelectorAll('.delete-recipe').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                recipes.splice(index, 1); // Remove recipe from the array
                displayRecipes();
                logMessage('delete');
            });
        });
    }


    function logMessage(type) {
        switch (type) {
            case 'success':
                console.log("Recipe added");
                break;
            case 'error':
                console.log("Please fill in all fields and select an image.");
                break;
            case 'delete':
                console.log("Recipe deleted");
                break;
            default:
                console.log("Invalid Input.");
                break;
        }
    }
});


