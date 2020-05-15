require 'rails_helper'

RSpec.describe SearchService::Github do
  subject { described_class.new }
  let(:client) { double(search_repositories: github_response) }

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

  describe '#search' do
    before do
      allow(Octokit::Client).to receive(:new).and_return(client)
    end

    context 'invalid parameters' do
      it 'returns error on missing parameters' do
        expect(subject.search({})).to eq(error: 'param is missing or the value is empty: search key')
      end
    end

    it 'validates parameters with #validate_options!' do
      expect(subject).to receive(:validate_options!)
      subject.search({})
    end

    it 'passes request query to client' do
      expect(client).to receive(:search_repositories).with('str', page: 1, per_page: 20)
      subject.search(search_key: 'str')
    end

    it 'use page from options if present' do
      expect(client).to receive(:search_repositories).with('str', page: 3, per_page: 20)
      subject.search(search_key: 'str', page: 3)
    end

    context 'response' do
      it 'includes total count of records in response' do
        response = subject.search(search_key: 'str', page: 3)

        expect(response[:total]).to eq(1)
      end

      it 'includes items short representation' do
        response = subject.search(search_key: 'str', page: 3)

        expect(response[:items]).to eq([{
          url: 'test url',
          name: 'name',
          owner: 'login',
          stargazers_count: 5
        }])
      end
    end
  end

  describe '#client' do
    let(:key) { '123secret' }

    before { allow(Rails.application.credentials).to receive(:dig).with(:github_api_key).and_return(key) }

    it 'builds client with secret key stored' do
      expect(Octokit::Client).to receive(:new).with(access_token: key)
      subject.send(:client)
    end
  end
end
