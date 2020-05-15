# README

Hi, guys. This is simple single page application to search for Github projects localy. Based on Ruby 2.7.0, Rails 6, Bootstrap 4.

It includes simple search input (minimum 3 symbols required to start searching) and list of repositories available. Please note, that in shows only 20 records per page. But it also display total count of repositories available + link to next page at the bottom of the list.

# Project Setup

In order to run this project localy, please clone it to local machine (or required server). After that please go to project folder and run

> bundle install

After that, you need to install all front-end dependecies with

> yarn install

By default you can use key, stored in credentials.yml, to get access to Github API. If you need for some reason to update it, you can adjust key's value by running

> bundle exec rails credentials:edit

and modifying #github_api_key

To run server simply run

> bundle exec rails s

Server will be running on localhost:3000

# Or if you are lazy

You can run project with single command

> ./bin/server

This command will run list of commands and start server on localhost:3000

Note: If you are getting error while running this command, please give it permissions to run as script

> chmod 777 ./bin/server


# Testing

This project uses Rspec for test puprose. To run tests simply run

> bundle exec rspec

And check results.

Enjoy it !


UI examples:
![Alt text](https://github.com/igorpertsev/github_search/blob/master/public/example2.png "Search results")
![Alt text](https://github.com/igorpertsev/github_search/blob/master/public/example1.png "Next page")
