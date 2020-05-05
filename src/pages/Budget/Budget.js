import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions'
import { Grid } from './Budget.css';
import { LoadingIndicator } from 'components/LoadingIndicator';
import BudgetCategoryList from '/pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from './pages/Budget/components/BudgetTransactionList';

function Budget({
    budgetState, commonState,
    fetchBudget, fetchBudgetedCategories, fetchAllCategories
}) {
    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const isLoaded = useMemo(() => (!!commonState && Object.keys(commonState).length === 0)
        &&
        (!!budgetState && Object.keys(budgetState).length === 0),
        [commonState, budgetState]
    );

    return (
        <Grid>
            <section>
                {isLoaded ? (
                    <BudgetCategoryList/>
                ) : (
                        <LoadingIndicator></LoadingIndicator>
                    )}
            </section>

            <section>
                {isLoaded ? <BudgetTransactionList/> : (
                    <LoadingIndicator></LoadingIndicator>
                )}
            </section>

        </Grid>
    )
}

export default connect(state => {
    return {
        budget: state.budget.budget,
        commonState: state.commmon.loadingState,
        budgetState: state.budget.budgetState,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
}
)(Budget)

