// Will be good to provide full-scale pagination (both ways, pages) here in next releases.
const searchResultTemlate = `
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action active">
      Total Found Count: {{totalCount}}
    </a>
    {{itemsList}}
    <div href="#" class="next-page list-group-item list-group-item-action active">
      Next Page
    </div>
  </div>
`
const searchItemTemplate = `
  <a class="list-group-item list-group-item-action" href="{{htmlUrl}}" target="_blank">
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
  let itemsHtml = searchResponse.items.map((itemData) => {
    let html = searchItemTemplate;

    return html.replace('{{htmlUrl}}', itemData.url)
               .replace('{{repo}}', itemData.name.substring(0, 40))
               .replace('{{owner}}', itemData.owner)
               .replace('{{stargazersCount}}', itemData.stargazers_count);
  }).join('');

  let html = searchResultTemlate;

  return html.replace('{{itemsList}}', itemsHtml)
             .replace('{{totalCount}}', searchResponse.total)
};

export function renderErrorMessage(errorMessage) {
  let html = errorTemplate;
  return html.replace('{{errorMessage}}', errorMessage);
};

