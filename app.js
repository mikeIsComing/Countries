/* variables */
const inputField = document.getElementById("inpText");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

const renderCountry = () => {
  const countryName = inputField.value;
  const endpoint = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  fetch(endpoint)
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    .then((data) => {
      result.innerHTML = `<div class="wrapper">
      <img
        src="${data[0].flags.png}"
        alt="${data[0].flags.alt}"
      />
      <h3>${data[0].name.common}</h3>
    </div>
    <div class="wrapper-info">
      <p id="capital">Capital : <span>${data[0].capital}</span></p>
      <p id="continent">Continent : <span>${data[0].continents[0]}</span></p>
      <p id="population">Population : <span>${data[0].population}</span></p>
      <p id="currency">Currency : <span>${
        Object.keys(data[0].currencies)[0]
      }</span></p>
      <p id="languages">Common Languages : <span>${Object.values(
        data[0].languages
      )
        .join(", ")
        .toString()}</span></p>
    </div>`;
      inputField.value = "";
    })
    .catch((reject) => {
      result.innerHTML = `<h3 class="error-message">Invalid input. Try it again please!</h3>`;
    });
};

btn.onclick = renderCountry;
