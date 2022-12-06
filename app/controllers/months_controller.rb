class MonthsController < ApplicationController
    def index
        months = Month.all
        if months
            render json: months
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

end
