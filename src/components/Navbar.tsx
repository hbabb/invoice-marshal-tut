import Logo from "@/assets/images/logo.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="font-semibold text-3xl">
          Invoice<span className="text-blue-600">Marshal</span>
        </h3>
      </Link>
      <Button asChild variant="default" className="bg-blue-600 p-6">
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
      </Button>
    </div>
  );
}
