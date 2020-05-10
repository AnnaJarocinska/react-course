import React, { useMemo, useContext } from 'react';
import { List, ListItem } from './BudgetTransactionList.css';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import {useQuery} from 'react-query';
import { formatCurrency, formatDate } from 'utils';
import { selectedParentCategory, selectParentCategory } from 'data/actions/budget.actions.';
import API from 'data/fetch';
import BudgetContext from 'data/context/budget.context';


function BudgetTransactionList() {
    const {data: budget} = useQuery( ['budget', {id: 1}], API.budget.fetchBudget);
    const {data: allCategories} = useQuery( 'allCategories', API.common.fetchAllCategories);
    const {data: budgetedCategories} = useQuery( ['budgetedCategories', {id: 1}], API.budget.fetchBudgetedCategories);

    const {selectedParentCategoryId} = useContext(BudgetContext.store);
  
    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return budget.transactions
        }
        if (selectedParentCategory === null) {
            return budget.transactions.filter(transaction => {
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transactions.categoryId)
            })
        }

        return budget.transactions
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
    }, [allCategories, budgetedCategories, selectParentCategory, budget.transactions]);



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


export default BudgetTransactionList;