import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'active-link bg-white'
                    : 'border-transparent text-gray-900 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 bg-white'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
