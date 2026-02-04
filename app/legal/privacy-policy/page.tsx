import { PRIVACY_POLICY } from "@/data/policies";

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-none">
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                개인정보 처리방침
            </h1>
            <div className="text-neutral-700 dark:text-neutral-300 space-y-6 leading-8 whitespace-pre-wrap text-[15px]">
                {PRIVACY_POLICY}
            </div>
        </div>
    );
}
