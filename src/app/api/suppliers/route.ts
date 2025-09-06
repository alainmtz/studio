import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  // Get all suppliers
  const [rows] = await query('SELECT * FROM Suppliers');
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, contact_person, email, phone, items_supplied } = data;
  const [result]: any = await query(
    'INSERT INTO Suppliers (name, contact_person, email, phone, items_supplied) VALUES (?, ?, ?, ?, ?)',
    [name, contact_person, email, phone, items_supplied]
  );
  // MySQL2 returns [ResultSetHeader, undefined], so result.insertId is valid
  return NextResponse.json({ id: result.insertId });
}
