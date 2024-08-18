const expressionInput = document.getElementById('expression');
const calculateButton = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const calculationHistoryDiv = document.getElementById('calculation-history');

calculateButton.addEventListener('click', () => {
  const expression = expressionInput.value;

  fetch('/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `expression=${expression}`
  })
  .then(response => response.json())
  .then(data => {
    resultDiv.textContent = data.result;

    // Update the calculation history
    calculationHistoryDiv.innerHTML = '';
    data.calculations.forEach(calculation => {
      const p = document.createElement('p');
      p.textContent = `${calculation.expression} = ${calculation.result}`;
      calculationHistoryDiv.appendChild(p);
    });
  })
  .catch(error => console.error(error));
});