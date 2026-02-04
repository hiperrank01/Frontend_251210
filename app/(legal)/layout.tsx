import React from "react";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#fafafa] dark:bg-black min-h-screen">
            <div className="max-w-3xl mx-auto py-16 px-6 md:px-12 bg-white dark:bg-neutral-900 shadow-sm sm:my-10 sm:rounded-2xl border border-neutral-100 dark:border-neutral-800">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
