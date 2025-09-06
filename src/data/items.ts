export type Item = {
    id: string;
    name: string;
    sku: string;
    description: string | null;
    price: number;
    cost: number | null;
    quantity: number;
    brand: string | null;
    model: string | null;
    status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued' | null;
    supplier: {
        id: string;
        name: string;
    };
    provenance: string | null;
    warranty_days: number | null;
    images: {
        url: string;
        alt: string;
    }[];
    stock: number;
    category: string;
};
