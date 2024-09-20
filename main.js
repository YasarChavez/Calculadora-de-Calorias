// Get the modal
var modal = document.getElementById("resultModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function calculateMetabolism() {
    // Recoge los valores del formulario
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity-level').value);

    // Calcular TMB usando la fórmula de Harris-Benedict
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Calcular las diferentes necesidades calóricas
    const maintenance = bmr * activityLevel;
    
    // Ajustar cálculos según el género
    let lose, gain, muscle;
    if (gender === 'male') {
        lose = maintenance - 500;
        gain = maintenance + 400;
        muscle = maintenance + 300;
    } else {
        lose = maintenance - 300;
        gain = maintenance + 200;
        muscle = maintenance + 250;
    }

    // Función para calcular macronutrientes
    function calculateMacros(calories, carbPercentage, proteinPercentage, fatPercentage) {
        const carbCalories = calories * carbPercentage;
        const proteinCalories = calories * proteinPercentage;
        const fatCalories = calories * fatPercentage;

        return {
            carbs: (carbCalories / 4).toFixed(2),
            proteins: (proteinCalories / 4).toFixed(2),
            fats: (fatCalories / 9).toFixed(2)
        };
    }

    // Calcular macronutrientes para cada caso
    const bmrMacros = calculateMacros(bmr, 0.50, 0.25, 0.25);
    const maintenanceMacros = calculateMacros(maintenance, 0.50, 0.25, 0.25);
    const loseMacros = calculateMacros(lose, 0.40, 0.35, 0.25);
    const gainMacros = calculateMacros(gain, 0.50, 0.30, 0.20);
    const muscleMacros = calculateMacros(muscle, 0.45, 0.35, 0.20);

    // Mostrar resultados
    document.getElementById('bmr-output').textContent = bmr.toFixed(2);
    document.getElementById('maintenance-output').textContent = maintenance.toFixed(2);
    document.getElementById('lose-output').textContent = lose.toFixed(2);
    document.getElementById('gain-output').textContent = gain.toFixed(2);
    document.getElementById('muscle-output').textContent = muscle.toFixed(2);

    // Mostrar macronutrientes
    function displayMacros(prefix, macros) {
        document.getElementById(`${prefix}-carbs-output`).textContent = macros.carbs;
        document.getElementById(`${prefix}-proteins-output`).textContent = macros.proteins;
        document.getElementById(`${prefix}-fats-output`).textContent = macros.fats;
    }

    displayMacros('bmr', bmrMacros);
    displayMacros('maintenance', maintenanceMacros);
    displayMacros('lose', loseMacros);
    displayMacros('gain', gainMacros);
    displayMacros('muscle', muscleMacros);

    // Display the modal
    modal.style.display = "block";
}