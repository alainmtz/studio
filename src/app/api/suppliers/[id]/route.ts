import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const [rows]: any = await query('SELECT * FROM Suppliers WHERE id = ?', [params.id]);
  return NextResponse.json(rows[0] || null);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const { name, contact_person, email, phone, items_supplied } = data;
  await query(
    'UPDATE Suppliers SET name=?, contact_person=?, email=?, phone=?, items_supplied=? WHERE id=?',
    [name, contact_person, email, phone, items_supplied, params.id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await query('DELETE FROM Suppliers WHERE id = ?', [params.id]);
  return NextResponse.json({ success: true });
}
