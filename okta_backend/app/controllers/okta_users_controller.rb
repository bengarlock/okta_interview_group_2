class OktaUsersController < ApplicationController
  require 'json'
  require "/Users/bengarlock/RubymineProjects/okta_interview_group2_challenge/okta_backend/passwords.rb"

  def return_headers
    headers = {
      "Accept" => "application/json",
      "Content-Type" => "application/json",
      "Authorization" => "SSWS " + return_api_key
    }
    return headers
  end

  def index
    url = "https://dev-49794790.okta.com/api/v1/users"

    @okta_users = RestClient.get url, return_headers
    @okta_users = JSON.parse(@okta_users)
    @okta_users.each do |okta_user|
      url = "https://dev-49794790.okta.com/api/v1/users/" + okta_user["id"] + "/groups"
      groups = RestClient.get url, return_headers
      groups = JSON.parse(groups)
      okta_user["groups"] = groups
    end
    render json:@okta_users
  end

  def show
    url = "https://dev-49794790.okta.com/api/v1/users/" + params[:id]
    okta_user = RestClient.get url, return_headers
    okta_user = JSON.parse(okta_user)
    url = "https://dev-49794790.okta.com/api/v1/users/" + params[:id] + "/groups"
    groups = RestClient.get url, return_headers
    groups = JSON.parse(groups)
    okta_user["groups"] = groups
    render json:okta_user
  end

  def create
    url = "https://dev-49794790.okta.com/api/v1/users?activate=false"
    payload = {
      "profile" => {
        "firstName": params[:firstName],
        "lastName": params[:lastName],
        "email": params[:email],
        "login": params[:login],
        "mobilePhone": params[:mobilePhone]
      }
    }
    @new_user = RestClient.post url, payload.to_json, return_headers
    @new_user = JSON.parse(@new_user)
    render json:@new_user
  end

  def update
    url = "https://dev-49794790.okta.com/api/v1/users/" + params[:id]
    payload = {
      "profile" => {
        "firstName": params[:firstName],
        "lastName": params[:lastName],
        "email": params[:email],
        "login": params[:login],
        "mobilePhone": params[:mobilePhone]
      }
    }

    updated_user = RestClient.put url, payload.to_json, return_headers
    updated_user = JSON.parse(updated_user)
    render json:updated_user

  end

  def destroy
    url = "https://dev-49794790.okta.com/api/v1/users/" + params[:id]
    RestClient.delete(url, return_headers)
    render json: {}
  end

end
