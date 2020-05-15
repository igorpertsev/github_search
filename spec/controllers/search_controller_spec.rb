require 'rails_helper'

RSpec.describe SearchController, type: :controller do
  let(:github_response) do
    {
      total_count: 1,
      items: [
        {
          html_url: 'test url',
          name: 'name',
          owner: {
            login: 'login'
          },
          stargazers_count: 5
        }
      ]
    }
  end

  before do
    allow_any_instance_of(Octokit::Client).to receive(:search_repositories).and_return(github_response)
  end

  describe "GET #search" do
    context "with valid parameters" do
      let(:valid_params) { { search_key: 'test', page: 2 } }

      it "returns a success response" do
        get :search, params: valid_params
        expect(response).to be_successful
      end

      it "returns correct data" do
        get :search, params: valid_params
        json_response = JSON.parse(response.body).symbolize_keys

        expected_items = [
          {
            'url' => 'test url',
            'name' => 'name',
            'owner' => 'login',
            'stargazers_count' => 5
          }
        ]
        expect(json_response[:total]).to eq(1)
        expect(json_response[:items]).to eq(expected_items)
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) { { page: 2 } }

      it "returns an error response" do
        get :search, params: invalid_params
        expect(response).not_to be_successful
      end

      it "returns error message" do
        get :search, params: invalid_params
        expect(JSON.parse(response.body)['error'].to_s).to eq("param is missing or the value is empty: search key")
      end
    end
  end
end
