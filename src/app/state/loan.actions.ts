import { createAction, props } from '@ngrx/store';

export const updateLoanInputs = createAction(
  '[Loan Calculator] Update Inputs',
  props<{ amount: number; tenure: number; tenureType: 'Year' | 'Month' | 'Days' }>()
);

export const setCalculatedEmi = createAction(
  '[Loan Calculator] Set Calculated EMI',
  props<{ emi: number; totalInterest: number }>()
);

export const resetLoanState = createAction('[Loan] Reset');