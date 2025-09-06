'use server';

import { getConnection } from '@/lib/db';
import { Item } from '@/data/items'; // Re-using the Item type for structure
import { Supplier } from '@/data/suppliers';

export async function getInventoryItems(): Promise<Item[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT
        i.id,
        i.name,
        i.sku,
        i.description,
        i.price,
        i.cost,
        i.quantity,
        i.brand,
        i.model,
        i.status,
        i.supplier_id,
        i.provenance,
        i.warranty_days,
        i.image_url as imageUrl,
        s.name as supplierName
      FROM Items i
      LEFT JOIN suppliers s ON i.supplier_id = s.id`
    );

    const items: Item[] = (rows as any[]).map(row => ({
      id: String(row.id),
      name: row.name,
      sku: row.sku,
      description: row.description ?? null,
      price: Number(row.price),
      cost: row.cost !== undefined ? Number(row.cost) : null,
      quantity: row.quantity !== undefined ? Number(row.quantity) : 0,
      brand: row.brand ?? null,
      model: row.model ?? null,
      status: row.status ?? null,
      supplier: { id: String(row.supplier_id), name: row.supplierName || 'N/A' },
      provenance: row.provenance ?? null,
      warranty_days: row.warranty_days !== undefined ? Number(row.warranty_days) : null,
      images: [{
        url: row.imageUrl ? `/uploads/${row.imageUrl}` : `https://picsum.photos/seed/${row.sku}/600/600`,
        alt: row.name
      }],
      stock: row.quantity !== undefined ? Number(row.quantity) : 0,
      category: row.brand ?? ''
    }));

    return items;

  } catch (error: any) {
    console.error('Failed to fetch inventory items:', error?.message || error);
    if (error?.sqlMessage) {
      console.error('SQL Error:', error.sqlMessage);
    }
    throw new Error('A database error occurred while fetching inventory items. ' + (error?.message || ''));
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

export async function getSuppliers(): Promise<Supplier[]> {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(
            `SELECT id, name, contact_person as contactPerson, email, phone, items_supplied as itemsSupplied FROM suppliers`
        );
        const suppliers: Supplier[] = (rows as any[]).map(row => ({
            id: String(row.id),
            name: row.name,
            contactPerson: row.contactPerson,
            email: row.email,
            phone: row.phone,
            itemsSupplied: row.itemsSupplied,
        }));
        return suppliers;
    } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        throw new Error('A database error occurred while fetching suppliers.');
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

type NewItem = {
    name: string;
    sku: string;
    description?: string;
    price: number;
    cost?: number;
    quantity?: number;
    brand?: string;
    model?: string;
    status?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
    supplierId?: number;
    provenance?: string;
    warranty_days?: number;
    imageUrl?: string;
}

export async function createItem(item: NewItem): Promise<void> {
    let connection;
    try {
        connection = await getConnection();
        const { name, sku, description, price, cost, quantity, brand, model, status, supplierId, provenance, warranty_days, imageUrl } = item;
        
        await connection.execute(
            `INSERT INTO Items (name, sku, description, price, cost, quantity, brand, model, status, supplier_id, provenance, warranty_days, image_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, sku, description, price, cost, quantity, brand, model, status, supplierId, provenance, warranty_days, imageUrl || `https://picsum.photos/seed/${sku}/600/600`]
        );

    } catch (error) {
        console.error('Failed to create item:', error);
        throw new Error('Could not save the new item to the database.');
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
