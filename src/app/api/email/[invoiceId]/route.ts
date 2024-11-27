import prisma from "@/utils/db";
import { requireUser } from "@/utils/hooks";
import { emailClient } from "@/utils/mailtrap";
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function assertEnvVar(): { emailFrom: string; emailTo: string } {
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;
  if (!emailFrom || !emailTo) {
    const error = new CustomError("Missing required environment variables for email", 500);
    Sentry.captureException(error);
    throw new Response(error.message, { status: error.statusCode });
  }
  return {
    emailFrom,
    emailTo,
  };
}

export async function POST(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  },
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      const error = new CustomError("Invoice not found", 404);
      Sentry.captureException(error);
      /* The line `return new Response(error.message, { status: error.statusCode });` is creating
            a new Response object with the error message as the body and the status code from the
            CustomError object. This response will be returned from the POST function when the
            condition `if (!invoiceData)` is met, indicating that the requested invoice was not
            found. */
      return new Response(error.message, { status: error.statusCode });
    }

    const { emailFrom, emailTo } = assertEnvVar();

    const sender = {
      email: emailFrom,
      name: "Heath Babb",
    };

    emailClient.send({
      from: sender,
      to: [{ email: emailTo }],
      subject: "Invoice from InvoiceMarshal",
      template_uuid: "2d1f0a1d-8a0d-4a9a-8a1d-8a0d4a9a8a1d",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceMarshal",
        company_info_address: "123 Main Street",
        company_info_city: "Anytown",
        company_info_state: "AS",
        company_info_zip: "12345",
        company_info_country: "USA",
      },
    });

    return NextResponse.json({ success: true });
  } catch (_e) {
    const error = new CustomError("Error sending email", 500);
    Sentry.captureException(error);
    return new NextResponse(error.message, { status: error.statusCode });
  }
}
