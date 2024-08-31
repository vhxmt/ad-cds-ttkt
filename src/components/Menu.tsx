import Link from 'next/link';
import { menuItems } from '@/data/menuData';
import { usePathname } from 'next/navigation';

const Menu = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 text-black h-screen bg-gray-200">
            <nav className="flex flex-col space-y-0">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`block py-4 px-3 shadow-md transition-colors ${pathname === item.href ? 'bg-blue-500 text-white' : 'bg-white text-black'} hover:bg-gray-100 border-b border-gray-300 last:border-0`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Menu;
