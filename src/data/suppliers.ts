
export type Supplier = {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  items_supplied: string;
};

export async function getSuppliers(): Promise<Supplier[]> {
  const res = await fetch('/api/suppliers');
  if (!res.ok) throw new Error('Failed to fetch suppliers');
  return await res.json();
}

export async function getSupplier(id: number): Promise<Supplier> {
  const res = await fetch(`/api/suppliers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch supplier');
  return await res.json();
}

export async function createSupplier(data: Partial<Supplier>): Promise<number> {
  const res = await fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create supplier');
  const result = await res.json();
  return result.id;
}

export async function updateSupplier(id: number, data: Partial<Supplier>) {
  const res = await fetch(`/api/suppliers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update supplier');
  return await res.json();
}

export async function deleteSupplier(id: number) {
  const res = await fetch(`/api/suppliers/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete supplier');
  return await res.json();
}
  