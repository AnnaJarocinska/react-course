import {SET_SELECTED_PARENT_CATEGORY_ID} from 'data/constants';

export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id, 
    }
}