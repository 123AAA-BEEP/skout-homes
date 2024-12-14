'use client';

import Link from 'next/link';

interface BreadcrumbsProps {
    items: {
        label: string;
        href: string;
    }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
                <li>
                    <Link href="/" className="text-gray-400 hover:text-gray-500">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <span className="text-gray-400 mx-2">/</span>
                        <Link 
                            href={item.href}
                            className={index === items.length - 1 ? "text-gray-800" : "text-gray-400 hover:text-gray-500"}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
} 