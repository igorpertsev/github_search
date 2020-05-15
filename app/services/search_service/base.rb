module SearchService
  # Base class for making search request to some API. Can be easily overwritten in child classes.
  class Base
    ITEMS_PER_PAGE = 20.freeze

    def search(options = {})
      validate_options!(options)

      query = build_request_query(options[:search_key])
      response = client.search_repositories(query, page: options.fetch(:page) { 1 }, per_page: ITEMS_PER_PAGE)
      prepare_response(response)
    rescue StandardError => error
      { error: error.message }
    end

    def self.search(options)
      new.search(options)
    end

    private

    def validate_options!(options)
      raise ActionController::ParameterMissing, "search key" unless options[:search_key]
    end

    def prepare_response(response)
      {
        total: response[:total_count],
        items: parse_response_data(response[:items])
      }
    end

    def parse_response_data(items)
      # should be defined in sublings
    end

    def client
      # should be defined in sublings
    end

    def build_request_query(search_key)
      search_key
    end
  end
end
