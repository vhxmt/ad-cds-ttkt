'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsInHeader from './StatsInHeader';

const Header = () => {
    const [isAvatarHovered, setAvatarHovered] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi localStorage
        localStorage.removeItem('isLoggedIn');
        // Chuyển hướng đến trang đăng nhập
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between relative">
            {/* Biểu tượng trang chủ */}
            <Link href="/" className="ml-20 text-xl font-bold">
                Home
            </Link>

            {/* Phần thống kê */}
            <div className="flex-grow flex justify-center">
                <StatsInHeader />
            </div>

            {/* Biểu tượng avatar và menu đăng xuất */}
            <div
                className="relative mr-10"
                onMouseEnter={() => setAvatarHovered(true)}
                onMouseLeave={() => setAvatarHovered(false)}
            >
                <button className="flex items-center space-x-2">
                    <img src="/path/to/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                </button>

                {isAvatarHovered && (
                    <div className="absolute right-0 top-full bg-white text-black shadow-lg rounded-md w-32">
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
