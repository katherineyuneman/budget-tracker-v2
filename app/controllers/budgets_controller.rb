class BudgetsController < ApplicationController

    
    def index
        budgets = Budget.includes(:month).order("months.month_num ASC")
        render json: budgets, include: ['month']
    end

    def create
        budget = Budget.create(month_id: params[:month_id], amount: params[:amount].to_i, user_id: params[:user_id])
        if budget.id
            render json: budget
        else
            render json: { error: "Not authorized" }, status: :unauthorized
       
        end
    end

    def budget_summary
        month_id = Month.month_desc_conversion(params[:month_desc])
        budget = Budget.find_by_month_id(month_id)
        budget.to_json(include: :month)
    end

    def max_spend
        month_id = Month.month_desc_conversion(params[:month_desc])
        budget_id = Budget.find_by_month_id(month_id).id
        max_spend = Transaction.where(:budget_id => budget_id).maximum(:amount)
        max_spend.to_json
    end


    def show
        budget  = Budget.find(params[:id])
        budget.to_json(include: :month)
    end

    def update
        budget = Budget.find(params[:id])
        byebug
        if budget
            budget.update(params)
            
            render json: budget, include: [:month]
        else
            render json: { error: "Not authorized" }, status: :unauthorized
       
        end
    end

    def destroy
        budget = Budget.find(params[:id])
        budget.destroy
        budget.to_json
    end

    private

    def budget_params
        params.permit(:id, :amount)
    end

    # def month_desc_conversion
    #     Month.find_by_month_desc(params[:month_desc]).id
    # end

end