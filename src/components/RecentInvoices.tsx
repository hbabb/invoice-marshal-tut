import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/utils/db";
import { formatCurrency } from "@/utils/formatCurrency";
import { requireUser } from "@/utils/hooks";
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden size-9 sm:flex">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm leading-none">{item.clientName}</p>
              <p className="text-muted-foreground text-sm">{item.clientEmail}</p>
            </div>
            <div className="ml-auto font-medium">
              +
              {formatCurrency({
                amount: item.total,
                currency: item.currency as "USD" | "EUR",
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
