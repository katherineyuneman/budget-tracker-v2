class TransactionsController < ApplicationController

    def index
        budget_select_custom = Transaction.budget_select
        budget_transactions = budget_select_custom.order(created_at: :desc)
        render json: budget_transactions
    end

    def recent
        budget_select_custom = Transaction.budget_select
        transaction_summary = budget_select_custom.order(created_at: :desc).first(4)
        render json: transaction_summary
    end

    def create
        transaction = Transaction.create(
            description: params[:description],
            amount: params[:amount].to_f,
            category_id: params[:category_id],
            budget_id: params[:budget_id]
        )
        if transaction.valid?
            render json: transaction
        else
            {errors: transaction.errors.full_messages}.to_json
        end
    end

    def budget_transactions
        budget_select_custom = Transaction.budget_select
        transactions_budget = budget_select_custom.where(:budget_id => params[:id])
        render json: transactions_budget
    end

    def transactions_sum
        transactions_budget_sum = Transaction.where('budget_id = ?', params[:id]).sum(:amount)
        if transactions_budget_sum
            render json: transactions_budget_sum
        else
            render json: { error: "No transactions available" }, status: :unauthorized
        end
    end

    def destroy
        transaction = Transaction.find(params[:id])
        transaction.destroy
        render json: transaction
      end


    private
    
    # def transactions_sum_private
    #     @transactions_budget_sum = Transaction.where('budget_id = ?', params[:id]).sum(:amount)
    #     # @transactions_budget_sum = Transaction.where(:budget_id => params[:id]).sum(:amount)
    #     # @transactions_budget_sum = Transaction.where(budget_id: params[:id]).sum(:amount)
    #     render json: transactions_budget_sum
    # end

    
end