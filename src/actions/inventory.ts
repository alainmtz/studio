
'use server';

import { getConnection } from '@/lib/db';
import { Item } from '@/data/items'; // Re-using the Item type for structure

export async function getInventoryItems(): Promise<Item[]> {
  let connection;
  try {
    connection = await getConnection();
    // Note: This assumes you have a 'products' table with a 'supplier_name' column.
    // You may need to adjust the query to match your actual database schema, for example by JOINing with a suppliers table.
    const [rows] = await connection.execute(
      `SELECT
        p.id,
        p.name,
        p.sku,
        p.stock,
        p.price,
        p.status,
        p.category,
        p.description,
        p.image_url as imageUrl,
        s.name as supplierName
      FROM products p
      LEFT JOIN suppliers s ON p.supplier_id = s.id`
    );

    // The database returns a generic row type, so we need to cast it.
    // This is a simplified mapping.
    const items: Item[] = (rows as any[]).map(row => ({
      id: String(row.id),
      name: row.name,
      sku: row.sku,
      stock: row.stock,
      price: row.price,
      status: row.status,
      category: row.category,
      description: row.description,
      supplier: { id: '', name: row.supplierName || 'N/A' }, // Simplified supplier mapping
      images: [{ url: row.imageUrl || `https://picsum.photos/seed/${row.sku}/600/600`, alt: row.name }]
    }));

    return items;

  } catch (error) {
    console.error('Failed to fetch inventory items:', error);
    // In a real app, you'd want more robust error handling.
    // For now, we'll return an empty array on error.
    return [];
  } finally {
    if (connection) {
      try {
        await connection.release();
      } catch (releaseError) {
        console.error('Error releasing database connection:', releaseError);
      }
    }
  }
}
