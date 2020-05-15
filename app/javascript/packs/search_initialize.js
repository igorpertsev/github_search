import axios from 'axios';
import setupAxios from '../functions/setup_axios';
import { renderSearchResults, renderErrorMessage } from '../functions/renderers.js';

setupAxios();

document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('search_results');
  const repoSearchInputs = document.querySelectorAll('input.search_input');
  const errorsContainer = document.querySelectorAll('div.notifications');
  let timer;
  let lastQuery = '';

  const setErrorMessage= function(error) {
    errorsContainer.forEach(function(container) {
      container.innerHTML = error ? renderErrorMessage(error) : ''
    })
  }

  repoSearchInputs.forEach(function(input) {
    const runSearchRequest = () => {
      if (input.value.length < 3) { return };
      if (input.value === lastQuery) { return };
      lastQuery = input.value;

      axios.get(input.dataset.url, { params: { search_key: input.value } })
        .then(function (response) {
          resultsContainer.innerHTML = renderSearchResults(response.data);
        })
        .catch(error => {
          let errorMessage = error.message ? error.message : error.response.data.message
          setErrorMessage(errorMessage)
        });
    };

    $(input).bind("change paste keyup", () => {
      if (input.value !== lastQuery) {
        resultsContainer.innerHTML = '';
        setErrorMessage('')
        clearTimeout(timer);
        timer = setTimeout(runSearchRequest, 100);
      }
    });
  });
})
