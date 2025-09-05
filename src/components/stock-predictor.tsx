
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
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();


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
        title: t('stockPredictor.toast.title'),
        description: t('stockPredictor.toast.description'),
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
          {t('stockPredictor.title')}
        </CardTitle>
        <CardDescription>
            {t('stockPredictor.description')}
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
                  <FormLabel>{t('stockPredictor.leadTime.label')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('stockPredictor.leadTime.placeholder')} {...field} />
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
                  <FormLabel>{t('stockPredictor.salesTrend.label')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('stockPredictor.salesTrend.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? t('stockPredictor.predictingButton') : t('stockPredictor.predictButton')}
            </Button>
          </form>
        </Form>
        {prediction && (
            <Card className="bg-accent/50 border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5"/>
                        {t('stockPredictor.predictionResult.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background border">
                        <CalendarOff className="h-8 w-8 text-primary mt-1"/>
                        <div>
                            <p className="text-sm text-muted-foreground">{t('stockPredictor.predictionResult.outOfStockDate')}</p>
                            <p className="text-xl font-bold">{new Date(prediction.predictedOutOfStockDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 p-4 rounded-lg bg-background border">
                        <AlertCircle className="h-8 w-8 text-primary mt-1"/>
                        <div>
                            <p className="text-sm text-muted-foreground">{t('stockPredictor.predictionResult.reasoning')}</p>
                            <p className="text-sm">{prediction.reasoning}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{t('stockPredictor.predictionResult.confidenceLevel')}</p>
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
