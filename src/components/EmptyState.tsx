import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  title: string;
  description: string;
  buttontext: string;
  href: string;
}

export function EmptyState({ buttontext, description, href, title }: iAppProps) {
  return (
    <div className="fade-in-50 flex h-full flex-1 animate-in flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 font-semibold text-xl">{title}</h2>
      <p className="mx-auto mt-2 mb-8 max-w-xm text-center text-muted-foreground text-sm">{description}</p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="mr-2 size-4" /> {buttontext}
      </Link>
    </div>
  );
}
