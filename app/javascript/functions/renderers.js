const searchItemTemplate = `
  <a href="{{htmlUrl}}" target="_blank">
    <span class="panel-icon"><i class="fas fa-book"></i></span>
    <span>{{owner}}/<strong>{{repo}}</strong></span>
    <span class="panel-icon"><i class="fas fa-star"></i></span>
    <span class="is-size-7">{{stargazersCount}}</span>
  </a>
`
const errorTemplate = `
  <div class="alert alert-danger" role="alert">
    {{errorMessage}}
  </div>
`

export function renderSearchResults(searchResponse) {
  return searchResponse.map((itemData) => {
    let html = searchItemTemplate;

    return html.replace('{{htmlUrl}}', itemData.url)
               .replace('{{repo}}', itemData.name.substring(0, 40))
               .replace('{{owner}}', itemData.owner)
               .replace('{{stargazersCount}}', itemData.stargazers_count);
  }).join('');
};

export function renderErrorMessage(errorMessage) {
  let html = errorTemplate;
  return html.replace('{{errorMessage}}', errorMessage);
};
