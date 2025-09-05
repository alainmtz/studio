"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  predictStockLevels,
  type PredictStockLevelsOutput,
} from "@/ai/flows/predict-stock-levels";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, TrendingUp, AlertCircle, CalendarOff } from "lucide-react";

const formSchema = z.object({
  leadTimeDays: z.coerce
    .number()
    .min(0, "Lead time must be a positive number."),
  movingAverageWindow: z.coerce
    .number()
    .min(1, "Moving average window must be at least 1."),
});

type StockHistory = {
  date: string;
  stockLevel: number;
  sales: number;
};

export function StockPredictor({ itemHistory }: { itemHistory: StockHistory[] }) {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictStockLevelsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadTimeDays: 7,
      movingAverageWindow: 14,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictStockLevels({
        itemHistory,
        leadTimeDays: values.leadTimeDays,
        movingAverageWindow: values.movingAverageWindow,
      });
      setPrediction(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description:
          "Could not generate stock prediction. Please check the data and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Stock-Out Predictor
        </CardTitle>
        <CardDescription>
            Predict when this item will run out of stock based on historical sales data.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4 items-end">
            <FormField
              control={form.control}
              name="leadTimeDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Replenishment Lead Time (Days)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movingAverageWindow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Trend Window (Days)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 14" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? "Predicting..." : "Predict Stock-Out Date"}
            </Button>
          </form>
        </Form>
        {prediction && (
            <Card className="bg-accent/50 border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5"/>
                        Prediction Result
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background border">
                        <CalendarOff className="h-8 w-8 text-primary mt-1"/>
                        <div>
                            <p className="text-sm text-muted-foreground">Predicted Out-of-Stock Date</p>
                            <p className="text-xl font-bold">{new Date(prediction.predictedOutOfStockDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 p-4 rounded-lg bg-background border">
                        <AlertCircle className="h-8 w-8 text-primary mt-1"/>
                        <div>
                            <p className="text-sm text-muted-foreground">Reasoning</p>
                            <p className="text-sm">{prediction.reasoning}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                        <div className="flex items-center gap-2">
                             <div className="w-full bg-muted rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${prediction.confidenceLevel * 100}%` }}></div>
                            </div>
                            <span className="text-sm font-medium">{Math.round(prediction.confidenceLevel * 100)}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}
