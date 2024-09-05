function calculateCalories() {
    // Recoge los valores del formulario
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity-level').value);
    const goal = document.getElementById('goal').value;
  
    // Calcular TMB usando la fórmula de Harris-Benedict
    let tmb;
  
    if (gender === 'male') {
      tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    // Multiplica la TMB por el nivel de actividad
    let caloricNeeds = tmb * activityLevel;
  
    // Ajuste según el objetivo
    if (goal === 'lose') {
      caloricNeeds -= 500; // Reducir 500 calorías para pérdida de peso
    } else if (goal === 'gain') {
      caloricNeeds += 500; // Aumentar 500 calorías para ganancia de masa
    }
  
    // Cálculo de macronutrientes (en porcentajes comunes)
    const carbPercentage = 0.50; // 50% de las calorías para carbohidratos
    const proteinPercentage = 0.25; // 25% de las calorías para proteínas
    const fatPercentage = 0.25; // 25% de las calorías para grasas
  
    // Cálculo de calorías en macronutrientes
    const carbCalories = caloricNeeds * carbPercentage;
    const proteinCalories = caloricNeeds * proteinPercentage;
    const fatCalories = caloricNeeds * fatPercentage;
  
    // Conversión de calorías a gramos
    const carbGrams = carbCalories / 4;
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
  
    // Muestra el resultado en calorías
    document.getElementById('calories-output').textContent = caloricNeeds.toFixed(2);

    // Muestra los resultados de los macronutrientes
    document.getElementById('carbs-output').textContent = carbGrams.toFixed(2);
    document.getElementById('proteins-output').textContent = proteinGrams.toFixed(2);
    document.getElementById('fats-output').textContent = fatGrams.toFixed(2);

    document.querySelector('.result').style.display = 'block';
}
