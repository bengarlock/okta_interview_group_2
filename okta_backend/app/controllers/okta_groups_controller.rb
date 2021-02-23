class OktaGroupsController < ApplicationController
  require "/Users/bengarlock/RubymineProjects/okta_interview_group2_challenge/okta_backend/passwords.rb"
  require 'json'

  def return_headers
    headers = {
      "Accept" => "application/json",
      "Content-Type" => "application/json",
      "Authorization" => "SSWS " + return_api_key
    }
    return headers
  end

  def index
    url = "https://dev-49794790.okta.com/api/v1/groups"
    @okta_groups = RestClient.get url, return_headers
    render json:@okta_groups
  end

  def show
    url = "https://dev-49794790.okta.com/api/v1/groups/" + params[:id]
    okta_group = RestClient.get url, return_headers
    okta_group = JSON.parse(okta_group)
    render json:okta_group
  end

  def update
    okta_user_groups = JSON.parse(RestClient.get "https://dev-49794790.okta.com/api/v1/users/" + params[:user_id] + "/groups", return_headers)
    groups = okta_user_groups.map {|group| group["id"]}

    if groups.include? params[:id]
      #remove user from group
      RestClient.delete "https://dev-49794790.okta.com/api/v1/groups/" + params[:id] + "/users/" + params[:user_id], return_headers
      render json:{}
    else
      #add user to group
      RestClient.put("https://dev-49794790.okta.com/api/v1/groups/" + params[:id] + "/users/" + params[:user_id], payload={}, return_headers)
      render json:{}
    end
  end
end

