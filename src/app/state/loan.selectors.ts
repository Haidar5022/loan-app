import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from './loan.reducer';

export const selectLoanState = createFeatureSelector<LoanState>('loan');

export const selectLoanAmount = createSelector(selectLoanState, (state) => state ? state.amount : 0);
export const selectMonthlyEmi = createSelector(selectLoanState, (state) => state ? state.monthlyEmi : 0);
export const selectTotalInterest = createSelector(selectLoanState, (state) => state ? state.totalInterest : 0);
export const selectTotalPayable = createSelector(selectLoanState, (state) => state ? (state.amount + state.totalInterest) : 0);
export const selectTenure = createSelector(selectLoanState, (state) => state ? `${state.tenure} ${state.tenureType}` : '');