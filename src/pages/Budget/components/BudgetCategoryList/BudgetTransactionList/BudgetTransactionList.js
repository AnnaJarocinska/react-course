import React, { useMemo } from 'react';
import { List, ListItem } from './BudgetTransactionList.css';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { formatCurrency, formatDate } from 'utils';
import { selectedParentCategory, selectParentCategory } from 'data/actions/budget.actions.';


function BudgetTransactionList({ transactions, allCategories, budgetedCategories, selectedParentCategoryId }) {

    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return transactions
        }
        if (selectedParentCategory === null) {
            return transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transactions.categoryId)
            })
        }



        return transactions
            .filter(transaction => {
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name;
                    return parentCategoryName === selectedParentCategoryId;
                }
                catch (error) {
                    return false;
                }
            })
    }, [allCategories, budgetedCategories, selectParentCategory, transactions]);



    const groupedTransactions = useMemo(() => groupBy(
        filteredTransactionsBySelectedParentCategory,
        transaction => new Date(transaction.date).getUTCDate()
    ), [filteredTransactionsBySelectedParentCategory,] }
return (
    <List>
        {Object.entries(groupedTransactions).map(([key, transactions]) => (
            <li>
                <ul>
                    {transactions.map(transaction => (
                        <ListItem>
                            <div>{transaction.description}</div>
                            <div>{formatCurrency(transaction.amount)}</div>
                            <div>{formatDate(transaction.date)}</div>
                            <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                        </ListItem>
                    ))}
                </ul>
            </li>
        ))}

    </List>

)
};

export default connect(state => ({
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);