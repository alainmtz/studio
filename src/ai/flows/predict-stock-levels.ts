'use server';

/**
 * @fileOverview Predicts stock levels using AI based on historical data and moving average calculations.
 *
 * - predictStockLevels - A function that predicts stock levels.
 * - PredictStockLevelsInput - The input type for the predictStockLevels function.
 * - PredictStockLevelsOutput - The return type for the predictStockLevels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStockLevelsInputSchema = z.object({
  itemHistory: z
    .array(
      z.object({
        date: z.string().describe('The date of the stock level.'),
        stockLevel: z.number().describe('The stock level for the item on the specified date.'),
        sales: z.number().describe('The number of sales for the item on the specified date.'),
      })
    )
    .describe('Historical data for the item, including date and stock level.'),
  leadTimeDays: z
    .number()
    .describe('The lead time in days required to replenish the stock.'),
  movingAverageWindow: z
    .number()
    .default(7)
    .describe(
      'The number of days to use for calculating the moving average of sales. Defaults to 7 days.'
    ),
});
export type PredictStockLevelsInput = z.infer<typeof PredictStockLevelsInputSchema>;

const PredictStockLevelsOutputSchema = z.object({
  predictedOutOfStockDate: z
    .string()
    .describe(
      'The predicted date when the item will run out of stock, in ISO 8601 format (YYYY-MM-DD).'
    ),
  confidenceLevel: z
    .number()
    .describe(
      'A value representing the confidence level of the prediction, from 0 (least confident) to 1 (most confident).'
    ),
  reasoning: z
    .string()
    .describe('A brief explanation of the factors influencing the prediction.'),
});
export type PredictStockLevelsOutput = z.infer<typeof PredictStockLevelsOutputSchema>;

export async function predictStockLevels(input: PredictStockLevelsInput): Promise<PredictStockLevelsOutput> {
  return predictStockLevelsFlow(input);
}

const predictStockLevelsPrompt = ai.definePrompt({
  name: 'predictStockLevelsPrompt',
  input: {schema: PredictStockLevelsInputSchema},
  output: {schema: PredictStockLevelsOutputSchema},
  prompt: `You are an AI assistant specializing in predicting stock levels based on historical data.

  Given the following historical stock levels and sales data, predict when the item will run out of stock.
  Consider the lead time required to replenish the stock.
  Use moving average calculations over the last {{movingAverageWindow}} days to estimate future sales.

  Historical Data:
  {{#each itemHistory}}
  - Date: {{date}}, Stock Level: {{stockLevel}}, Sales: {{sales}}
  {{/each}}

  Lead Time: {{leadTimeDays}} days

  Moving Average Window: {{movingAverageWindow}} days

  Provide the predicted out-of-stock date in ISO 8601 format (YYYY-MM-DD), a confidence level between 0 and 1, and a brief explanation of your reasoning.
  Do not use external tools or functions, all necessary data is provided in the input.
`,
});

const predictStockLevelsFlow = ai.defineFlow(
  {
    name: 'predictStockLevelsFlow',
    inputSchema: PredictStockLevelsInputSchema,
    outputSchema: PredictStockLevelsOutputSchema,
  },
  async input => {
    const {output} = await predictStockLevelsPrompt(input);
    return output!;
  }
);
