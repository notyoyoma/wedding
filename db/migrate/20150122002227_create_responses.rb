class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :person
      t.string :email
      t.string :plusses

      t.timestamps
    end
  end
end
