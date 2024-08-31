'use client';

import Menu from '@/components/Menu';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const isFirstVisit = localStorage.getItem('firstVisit') === null;

        if (isFirstVisit) {
            // Đặt cờ là đã truy cập lần đầu
            localStorage.setItem('firstVisit', 'true');
            // Chuyển hướng đến trang đăng nhập
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <div className="flex flex-grow">
                {/* Sidebar Menu */}
                <Menu />

                {/* Main Content Area */}
                <main className="flex-1 p-8 bg-gray-100">
                    {/* Nội dung của trang chủ */}
                    <div className="p-6 bg-white text-black shadow-md rounded-lg">
                        <h1 className="text-3xl font-bold mb-6">Trang Chủ</h1>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
