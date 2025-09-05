
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, ShoppingCart, Users, MoreVertical } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";

const generateSalesData = () => [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

const recentTransactions = [
  {
    order: "ORD001",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "250.00",
    status: "Fulfilled",
    date: "2024-05-23",
  },
  {
    order: "ORD002",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "150.75",
    status: "Processing",
    date: "2024-05-23",
  },
  {
    order: "ORD003",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "350.00",
    status: "Fulfilled",
    date: "2024-05-22",
  },
  {
    order: "ORD004",
    customer: "William Kim",
    email: "will@email.com",
    amount: "450.50",
    status: "Shipped",
    date: "2024-05-21",
  },
  {
    order: "ORD005",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "550.00",
    status: "Fulfilled",
    date: "2024-05-20",
  },
];

type Transaction = (typeof recentTransactions)[0];

export default function DashboardPage() {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setSalesData(generateSalesData());
  }, []);

  if (!salesData.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.totalValueDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.lowStockItems')}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.lowStockItemsDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalSales')}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.totalSalesDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.activeSuppliers')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+57</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.activeSuppliersDesc')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.salesOverview')}</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--accent))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t('dashboard.recentTransactions')}</h2>
            <p className="text-muted-foreground">{t('dashboard.recentTransactionsDesc')}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.order}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                 <div className="flex flex-col">
                    <CardTitle className="text-base font-medium">{transaction.customer}</CardTitle>
                    <CardDescription>{transaction.order}</CardDescription>
                </div>
                 <Badge
                    variant={
                      transaction.status === "Fulfilled"
                        ? "default"
                        : transaction.status === "Processing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {t(`dashboard.transactionStatus.${transaction.status.toLowerCase()}` as any)}
                  </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${transaction.amount}</div>
                <p className="text-xs text-muted-foreground">
                  {transaction.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedTransaction && (
        <Dialog
          open={!!selectedTransaction}
          onOpenChange={(open) => !open && setSelectedTransaction(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dashboard.dialog.order')} {selectedTransaction.order}</DialogTitle>
              <DialogDescription>
                {t('dashboard.dialog.detailsFor')} {selectedTransaction.date}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('dashboard.dialog.customer')}</p>
                <p className="col-span-3 font-medium">
                  {selectedTransaction.customer}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('dashboard.dialog.email')}</p>
                <p className="col-span-3">{selectedTransaction.email}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('dashboard.dialog.amount')}</p>
                <p className="col-span-3 font-bold">
                  ${selectedTransaction.amount}
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right text-muted-foreground">{t('dashboard.dialog.status')}</p>
                <div className="col-span-3">
                  <Badge
                    variant={
                      selectedTransaction.status === "Fulfilled"
                        ? "default"
                        : selectedTransaction.status === "Processing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                     {t(`dashboard.transactionStatus.${selectedTransaction.status.toLowerCase()}` as any)}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedTransaction(null)}
              >
                {t('common.close')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
