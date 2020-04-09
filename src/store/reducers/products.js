import { SET_PRODUCTS } from '../actions/actionTypes';

const defaultState = [];

export default function products(state = defaultState, action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		default:
			return state;
	}
}
