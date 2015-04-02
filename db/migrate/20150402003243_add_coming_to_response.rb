class AddComingToResponse < ActiveRecord::Migration
  def change
    add_column :responses, :coming, :boolean
  end
end
