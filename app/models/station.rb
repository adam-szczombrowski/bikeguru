class Station < ApplicationRecord
  has_many :user_stations
  has_many :users, through: :user_stations
  belongs_to :city
end
