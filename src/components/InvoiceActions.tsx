"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CheckCircle,
    DownloadCloudIcon,
    Mail,
    MoreHorizontal,
    Pencil,
    Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
    id: string;
    status: string;
};

export function InvoiceActions({ id, status }: iAppProps) {
    const handleSendReminder = () => {
        toast.promise(
            fetch(`/api/email/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
            }),
            {
                loading: "Sending reminder email...",
                success: "Reminder email sent successfully!",
                error: "Failed to send reminder email",
            }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

                {/* Edit Invoice */}
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}>
                        <Pencil className="size-4 mr-2" /> Edit Invoice
                    </Link>
                </DropdownMenuItem>

                {/* Download Invoice */}
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target="_blank">
                        <DownloadCloudIcon className="size-4 mr-2" /> Download Invoice 
                    </Link>
                </DropdownMenuItem>

                {/* Send Reminder Email */}
                <DropdownMenuItem onClick={handleSendReminder}>
                    <Mail className="size-4 mr-2" /> Send Reminder Email
                </DropdownMenuItem>

                {/* Delete Invoice */}
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoice/${id}/delete`}>
                        <Trash className="size-4 mr-2" /> Delete Invoice 
                    </Link>
                </DropdownMenuItem>

                {/* Mark as paid */}
                    {status !== "PAID" && (
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/invoices/${id}/paid`}>
                                <CheckCircle className="size-4 mr-2" /> Mark as Paid
                            </Link>
                        </DropdownMenuItem>
                    )}
                
            </DropdownMenuContent>
        </DropdownMenu>
    );
};