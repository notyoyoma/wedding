json.array!(@responses) do |response|
  json.extract! response, :id, :person, :email, :plusses
  json.url response_url(response, format: :json)
end
