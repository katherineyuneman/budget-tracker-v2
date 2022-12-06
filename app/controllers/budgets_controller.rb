class BudgetsController < ApplicationController

    
    def index
        budgets = Budget.includes(:month).order("months.year, months.month_num ASC")
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
        render json: budget, include: ['month']
    end

    def max_spend
        month_id = Month.month_desc_conversion(params[:month_desc])
        budget_id = Budget.find_by_month_id(month_id).id
        max_spend = Transaction.where(:budget_id => budget_id).maximum(:amount)
        if max_spend
            render json: max_spend
        else
            render json: { error: "No transactions available" }, status: :unauthorized
        end
    end


    def show
        budget  = Budget.find(params[:id])
        budget.to_json(include: :month)
    end

    def update
        budget = Budget.find(params[:id])
        if budget
            budget.update(budget_params)
            
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
        params.require(:budget).permit(:id, :amount)
    end

    # def month_desc_conversion
    #     Month.find_by_month_desc(params[:month_desc]).id
    # end

end