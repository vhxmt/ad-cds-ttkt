// src/components/StatsInHeader.tsx
import { accessStats } from '@/data/accessData';

const StatsInHeader = () => {
    return (
        <div className="flex text-black space-x-6">
            <div className="bg-blue-100 p-4 rounded-lg text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold">Tổng lượt truy cập</h3>
                <p className="text-xl font-bold">{accessStats.totalVisits}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold">Hôm nay</h3>
                <p className="text-xl font-bold">{accessStats.todaysVisits}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold">Tuần này</h3>
                <p className="text-xl font-bold">{accessStats.weeklyVisits}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold">Tháng này</h3>
                <p className="text-xl font-bold">{accessStats.monthlyVisits}</p>
            </div>
        </div>
    );
};

export default StatsInHeader;
