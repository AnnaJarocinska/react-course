
import {SET_SELECTED_PARENT_CATEGORY_ID} from 'data/constants';

const initialState = {
    selectedParentCategoryId: undefined,
}

function budget(state = initialState, action) {
    switch (action.type) {
            case SET_SELECTED_PARENT_CATEGORY_ID:
                return {
                    ...state,
                    selectedParentCategoryId: action.payload
                }
        default:
            return state;
    }}

export default budget;