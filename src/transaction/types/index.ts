export interface ITransactionCsv {
  bank: string;
  concept: string;
  amount: number;
  date: string;
  store: string;
  isReserved: string;
  isPaid: string;
  additionalComments: string;
}
