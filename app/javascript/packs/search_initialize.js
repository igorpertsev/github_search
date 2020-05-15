import axios from 'axios';
import setupAxios from '../functions/setup_axios';
import { renderSearchResults, renderErrorMessage } from '../functions/renderers.js';

setupAxios();

document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('search_results');
  const repoSearchInputs = document.querySelector('input.search_input');
  const errorsContainer = document.querySelector('div.notifications');
  let timer;
  let lastPage = 1;
  let lastQuery = '';

  const setErrorMessage= function(error) {
    errorsContainer.innerHTML = error ? renderErrorMessage(error) : ''
  }

  const runSearchRequest = () => {
    let $input = $(repoSearchInputs);
    let inputValue = repoSearchInputs.value;
    if (inputValue.length < 3) { return };
    if (inputValue === lastQuery && $input.data('page') == lastPage) { return };
    if (inputValue != lastQuery) { $input.data('page', 1) }

    lastQuery = inputValue;
    lastPage = $input.data('page')

    axios.get($input.data('url'), {
      params: {
        search_key: inputValue,
        page: $input.data('page')
      }
    }).then(function (response) {
        resultsContainer.innerHTML = renderSearchResults(response.data);
        $('div.next-page').bind('click', () => {
          $input.data('page', parseInt($input.data('page')) + 1);
          runSearchRequest();
        })
      })
      .catch(error => {
        let errorMessage = error.message ? error.message : error.response.data.message
        setErrorMessage(errorMessage)
      });
  };

  $(repoSearchInputs).bind("change paste keyup", () => {
    if (repoSearchInputs.value !== lastQuery || $(repoSearchInputs).data('page') != lastPage) {
      resultsContainer.innerHTML = '';
      setErrorMessage('')
      clearTimeout(timer);
      timer = setTimeout(runSearchRequest, 100);
    }
  });
})
