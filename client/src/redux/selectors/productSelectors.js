// client/src/redux/selectors/productSelectors.js
import { createSelector } from 'reselect';

const selectProductState = (state) => state.product;

export const selectProducts = createSelector(
  [selectProductState],
  (productState) => productState.products
);
