// /src/app/api/news/route.ts

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'tin-tuc', 'newItems.json');

export async function GET() {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return new Response('Error reading JSON file', { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json();
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.push(newItem);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return new Response(JSON.stringify(newItem), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error writing to JSON file:', error);
        return new Response('Error writing to JSON file', { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { index, item } = await request.json();
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data[index] = item;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return new Response(JSON.stringify(item), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error updating JSON file:', error);
        return new Response('Error updating JSON file', { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { index } = await request.json();
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting from JSON file:', error);
        return new Response('Error deleting from JSON file', { status: 500 });
    }
}
