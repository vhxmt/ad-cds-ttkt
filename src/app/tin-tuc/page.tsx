'use client';

import { useEffect, useState, MouseEvent } from 'react';
import Menu from '@/components/Menu';

interface NewsItem {
    title: string;
    description: string;
    link: string;
    imageUrl: string;
}

const AdminPage = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [newItem, setNewItem] = useState<NewsItem>({
        title: '',
        description: '',
        link: '',
        imageUrl: ''
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formPosition, setFormPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('/api/news');
            const data: NewsItem[] = await response.json();
            setNewsItems(data);
        };

        fetchNews();
    }, []);

    const handleAdd = async () => {
        const response = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        const addedItem = await response.json();
        setNewsItems([...newsItems, addedItem]);
        setNewItem({ title: '', description: '', link: '', imageUrl: '' });
        setShowForm(false);
    };

    const handleDelete = async (index: number) => {
        await fetch('/api/news', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
        setNewsItems(newsItems.filter((_, i) => i !== index));
    };

    const handleEdit = (event: MouseEvent<HTMLButtonElement>, index: number) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setFormPosition({
            top: rect.bottom + window.scrollY-130, // Đặt vị trí trên trục Y ngay dưới nút
            left: rect.left + window.scrollX // Đặt vị trí trên trục X căn chỉnh với nút
        });
        setEditingIndex(index);
        setEditingItem({ ...newsItems[index] });
    };


    const handleUpdate = async () => {
        if (editingIndex !== null && editingItem) {
            await fetch('/api/news', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index: editingIndex, item: editingItem })
            });
            const updatedItems = [...newsItems];
            updatedItems[editingIndex] = editingItem;
            setNewsItems(updatedItems);
            setEditingIndex(null);
            setEditingItem(null);
            setFormPosition(null);
        }
    };

    return (
        <div className="flex min-h-screen relative">
            {/* Menu */}
            <aside className="w-64 bg-gray-800 text-white">
                <Menu />
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 text-black p-6">
                <h1 className="text-3xl font-bold mb-6">Quản Lý Tin Tức</h1>

                {/* Nút Thêm Tin Tức */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white p-3 rounded mb-6"
                >
                    {showForm ? 'Hủy Thêm Tin Tức' : 'Thêm Tin Tức'}
                </button>

                {/* Thêm tin tức */}
                {showForm && (
                    <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Thêm Tin Tức</h2>
                        <input
                            type="text"
                            placeholder="Tiêu đề"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <textarea
                            placeholder="Mô tả"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full h-32"
                        />
                        <input
                            type="url"
                            placeholder="Liên kết"
                            value={newItem.link}
                            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="url"
                            placeholder="URL hình ảnh"
                            value={newItem.imageUrl}
                            onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            onClick={handleAdd}
                            className="bg-blue-600 text-white p-3 rounded"
                        >
                            Thêm Tin Tức
                        </button>
                    </div>
                )}

                {/* Danh sách tin tức */}
                <div className="space-y-4">
                    {newsItems.map((item, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover mb-4 rounded" />
                            <p className="mb-4">{item.description}</p>
                            <a href={item.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                Xem chi tiết
                            </a>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={(e) => handleEdit(e, index)}
                                    className="bg-yellow-500 text-white p-3 rounded"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="bg-red-600 text-white p-3 rounded"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sửa tin tức */}
                // Trong phần sửa tin tức
                {editingItem && formPosition && (
                    <div
                        className="absolute bg-white shadow-md rounded-lg p-4 w-1/2 max-w-md" // Thêm w-1/2 và max-w-md để điều chỉnh kích thước
                        style={{
                            top: formPosition.top,
                            left: formPosition.left,
                            transform: 'translateY(10px)', // Thêm một chút dịch chuyển để điều chỉnh vị trí nếu cần
                            zIndex: 10
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-2">Sửa Tin Tức</h2>
                        <input
                            type="text"
                            placeholder="Tiêu đề"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <textarea
                            placeholder="Mô tả"
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full h-32"
                        />
                        <input
                            type="url"
                            placeholder="Liên kết"
                            value={editingItem.link}
                            onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="url"
                            placeholder="URL hình ảnh"
                            value={editingItem.imageUrl}
                            onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                            className="block mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white p-3 rounded"
                        >
                            Cập Nhật
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
