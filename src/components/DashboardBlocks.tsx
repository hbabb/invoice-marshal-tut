import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/utils/db";
import { formatCurrency } from "@/utils/formatCurrency";
import { requireUser } from "@/utils/hooks";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

async function getData(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidinvoices,
  };
}

export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidinvoices } = await getData(session.user?.id as string);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD",
            })}
          </h2>
          <p className="text-muted-foreground text-xs">Based on total volume</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Invoices Issued</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">+{data.length}</h2>
          <p className="text-muted-foreground text-xs">Total Invoices Isued!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">+{paidinvoices.length}</h2>
          <p className="text-muted-foreground text-xs">Total Invoices which have been paid!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Pending Invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-2xl">+{openInvoices.length}</h2>
          <p className="text-muted-foreground text-xs">Invoices which are currently pending!</p>
        </CardContent>
      </Card>
    </div>
  );
}
