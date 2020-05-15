module SearchService
  class Github < Base
    private

    def parse_response_data(items)
      items.map do |item|
        {
          url: item[:html_url],
          name: item[:name],
          owner: item[:owner][:login],
          stargazers_count: item[:stargazers_count]
        }
      end
    end

    def client
      @client ||= Octokit::Client.new(access_token: Rails.application.credentials.dig(:github_api_key))
    end
  end
end
