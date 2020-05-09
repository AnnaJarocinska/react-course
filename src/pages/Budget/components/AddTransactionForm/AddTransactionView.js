import React from 'react';
import {useQuery, useMutation} from 'react-query';
import {useHistory} from 'react-router-dom';
import API from 'data/fetch';
import AddTransactionForm from './AddTransactionForm';

function AddTransactionView (){

    const {data: budget} = useQuery( ['budget', {id: 1}], API.budget.fetchBudget);
    const {data: allCategories} = useQuery( 'allCategories', API.common.fetchAllCategories);
    const [mutate] = useMutation(API.budget.addTransaction, {
    refetchQueries:[['budget', {id: 1}]],
    })
    const history = useHistory();

    const handleSubmitAddTransaction = (values) => {
        mutate({
            budgetId: budget.id,
            data: values
        }).then(()=> {
            history.goBack()
        })
            }
    return (
        <AddTransactionForm
        categories={allCategories}
        groupCategoriesBy="parentCategory.name"
        onSubmit={handleSubmitAddTransaction}
        />
    )
}

export default AddTransactionView;