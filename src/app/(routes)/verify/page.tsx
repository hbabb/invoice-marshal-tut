import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="-z-10 absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] bg-white">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#c9ebff,transparent)]" />
      </div>
      <Card className="w-96 px-5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>

          <CardTitle className="font-bold text-2xl">Check your Email</CardTitle>
          <CardDescription>We have sent a verification link to your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md border-yellow-300 bg-yellow-50 p-4">
            <div className="flex items-center">
              <AlertCircle className="size-5 text-yellow-400" />

              <p className="ml-3 font-medium text-sm text-yellow-700">Be sure to check your spam folder!</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft className="mr-2 size-4" /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
