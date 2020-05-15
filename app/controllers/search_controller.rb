class SearchController < ApplicationController
  def index; end

  def search
    search_response = ::SearchService::Github.search(params.slice(:search_key, :page))

    render json: search_response, status: search_response[:error] ? 500 : 200
  end
end
