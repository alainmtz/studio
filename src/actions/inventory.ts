'use server';
export async function deleteSupplier(id: number): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute('DELETE FROM suppliers WHERE id = ?', [id]);
  } catch (error) {
    console.error('Failed to delete supplier:', error);
    throw new Error('Could not delete the supplier from the database.');
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

export async function deleteItem(id: number): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute('DELETE FROM Items WHERE id = ?', [id]);
  } catch (error) {
    console.error('Failed to delete item:', error);
    throw new Error('Could not delete the item from the database.');
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
/**
 * Update only the image_url for an item by id
 */
export async function updateItemImageUrl(id: number, imageUrl: string): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'UPDATE Items SET image_url = ? WHERE id = ?',
      [imageUrl, id]
    );
  } catch (error) {
    console.error('Failed to update item image URL:', error);
    throw new Error('Could not update the item image URL in the database.');
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

// --- Stock History ---
export type StockHistoryEntry = {
  id: string;
  itemId: string;
  date: string;
  stockLevel: number;
  sales: number;
};

export async function getStockHistory(itemId: string): Promise<StockHistoryEntry[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, item_id as itemId, date, stock_level as stockLevel, sales FROM stock_history WHERE item_id = ? ORDER BY date ASC`,
      [itemId]
    );
    return (rows as any[]).map(row => ({
      id: String(row.id),
      itemId: String(row.itemId),
      date: row.date,
      stockLevel: Number(row.stockLevel),
      sales: Number(row.sales)
    }));
  } finally {
    if (connection) await connection.release();
  }
}

export async function addStockHistory(entry: Omit<StockHistoryEntry, 'id'>): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `INSERT INTO stock_history (item_id, date, stock_level, sales) VALUES (?, ?, ?, ?)`,
      [entry.itemId, entry.date, entry.stockLevel, entry.sales]
    );
  } finally {
    if (connection) await connection.release();
  }
}

// --- Activity Log ---
export type ActivityLogEntry = {
  id: string;
  itemId: string;
  date: string;
  user: string;
  action: string;
  quantity: number;
  details: string;
};

export async function getActivityLog(itemId: string): Promise<ActivityLogEntry[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT id, item_id as itemId, date, user, action, quantity, details FROM activity_log WHERE item_id = ? ORDER BY date DESC`,
      [itemId]
    );
    return (rows as any[]).map(row => ({
      id: String(row.id),
      itemId: String(row.itemId),
      date: row.date,
      user: row.user,
      action: row.action,
      quantity: Number(row.quantity),
      details: row.details
    }));
  } finally {
    if (connection) await connection.release();
  }
}

export async function addActivityLog(entry: Omit<ActivityLogEntry, 'id'>): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `INSERT INTO activity_log (item_id, date, user, action, quantity, details) VALUES (?, ?, ?, ?, ?, ?)`,
      [entry.itemId, entry.date, entry.user, entry.action, entry.quantity, entry.details]
    );
  } finally {
    if (connection) await connection.release();
  }
}

type UpdateItem = {
  id: string;
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  cost?: number;
  quantity?: number;
  brand?: string;
  model?: string;
  status?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
  supplierId?: number;
  provenance?: string;
  warranty_days?: number;
  imageUrl?: string;
};

export async function updateItem(item: UpdateItem): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    // Build dynamic SQL for only provided fields
    const fields = [];
    const values = [];
    if (item.name !== undefined) { fields.push('name = ?'); values.push(item.name); }
    if (item.sku !== undefined) { fields.push('sku = ?'); values.push(item.sku); }
    if (item.description !== undefined) { fields.push('description = ?'); values.push(item.description); }
    if (item.price !== undefined) { fields.push('price = ?'); values.push(item.price); }
    if (item.cost !== undefined) { fields.push('cost = ?'); values.push(item.cost); }
    if (item.quantity !== undefined) { fields.push('quantity = ?'); values.push(item.quantity); }
    if (item.brand !== undefined) { fields.push('brand = ?'); values.push(item.brand); }
    if (item.model !== undefined) { fields.push('model = ?'); values.push(item.model); }
    if (item.status !== undefined) { fields.push('status = ?'); values.push(item.status); }
    if (item.supplierId !== undefined) { fields.push('supplier_id = ?'); values.push(item.supplierId); }
    if (item.provenance !== undefined) { fields.push('provenance = ?'); values.push(item.provenance); }
    if (item.warranty_days !== undefined) { fields.push('warranty_days = ?'); values.push(item.warranty_days); }
    if (item.imageUrl !== undefined) { fields.push('image_url = ?'); values.push(item.imageUrl); }
    if (fields.length === 0) return;
    values.push(item.id);
    const sql = `UPDATE Items SET ${fields.join(', ')} WHERE id = ?`;
    await connection.execute(sql, values);
  } catch (error) {
    console.error('Failed to update item:', error);
    throw new Error('Could not update the item in the database.');
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
      id: Number(row.id),
      name: row.name,
      contact_person: row.contactPerson,
      email: row.email,
      phone: row.phone,
      items_supplied: row.itemsSupplied,
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
