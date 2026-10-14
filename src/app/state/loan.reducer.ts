import { createReducer, on } from '@ngrx/store';
import { updateLoanInputs, setCalculatedEmi, resetLoanState } from './loan.actions';

export interface LoanState {
  amount: number;
  tenure: number;
  tenureType: 'Year' | 'Month' | 'Days';
  monthlyEmi: number;
  totalInterest: number;
}

export const initialLoanState: LoanState = {
  amount: 142669,
  tenure: 1,
  tenureType: 'Year',
  monthlyEmi: 0,
  totalInterest: 0
};

export const loanReducer = createReducer(
  initialLoanState,
  on(updateLoanInputs, (state, { amount, tenure, tenureType }) => ({
    ...state,
    amount,
    tenure,
    tenureType
  })),
  on(setCalculatedEmi, (state, { emi, totalInterest }) => ({
    ...state,
    monthlyEmi: emi,
    totalInterest
  })),
  on(resetLoanState, () => initialLoanState)
);