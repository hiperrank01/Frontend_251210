import { TERMS_OF_SERVICE } from "@/data/policies";

export default function TermsOfServicePage() {
    return (
        <div className="max-w-none">
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                이용약관
            </h1>
            <div className="text-neutral-700 dark:text-neutral-300 space-y-6 leading-8 whitespace-pre-wrap text-[15px]">
                {TERMS_OF_SERVICE.split('---').map((section, idx) => (
                    <div key={idx} className={idx > 0 ? "pt-8 border-t border-neutral-100 dark:border-neutral-800" : ""}>
                        {section.trim()}
                    </div>
                ))}
            </div>
        </div>
    );
}
