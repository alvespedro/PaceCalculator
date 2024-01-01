const BASE_URL = 'http://localhost:3000'; // Substitua pelo seu URL base

document.addEventListener('DOMContentLoaded', () => {
  const calculatePaceByTimeForm = document.getElementById('calculatePaceByTimeForm');
  const calculatePaceByTotalMinutesForm = document.getElementById('calculatePaceByTotalMinutesForm');
  const resultDiv1 = document.getElementById('result1');
  const resultDiv2 = document.getElementById('result2');

  const makeRequest = async (endpoint, formData) => {
    const url = `${BASE_URL}/${endpoint}?${new URLSearchParams(formData).toString()}`;
    console.log(url)
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(endpoint == 'calculate-pace-time'){
        console.log(data)
      resultDiv1.innerHTML = `<p>Speed: ${JSON.stringify(data.speedKmPerHour)} km/h</p><br><p>Total time: ${JSON.stringify(data.time.hours)}hours ${JSON.stringify(data.time.minutes)}minutes ${JSON.stringify(data.time.seconds)}seconds</p>`;
      }else
      {
        console.log(data)
        resultDiv2.innerHTML = `<p>Pace: ${JSON.stringify(data.pace)} </p>`;          
      }
    } catch (error) {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };

  calculatePaceByTimeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(calculatePaceByTimeForm);
    await makeRequest('calculate-pace-time', formData);
  });

  calculatePaceByTotalMinutesForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(calculatePaceByTotalMinutesForm);
    await makeRequest('calculate-pace-total-minutes', formData);
  });
});
