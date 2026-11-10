import { QuestionItem } from '../types/question';
import { prelim2020Shift1Questions } from './prelim2020Shift1';
import { prelim2020Shift2Questions } from './prelim2020Shift2';

export const prelim2020Questions: QuestionItem[] = [
  ...prelim2020Shift1Questions,
  ...prelim2020Shift2Questions,
];
