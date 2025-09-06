"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Item } from '@/data/items';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getItems } from '@/data/items';
import { useTranslation } from '@/hooks/use-translation';

export default function ExportPage() {
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Try to get filtered items from localStorage
        const exportItems = localStorage.getItem('exportItems');
        if (exportItems) {
            try {
                const parsed = JSON.parse(exportItems);
                setFilteredItems(parsed);
                setLoading(false);
                return;
            } catch (e) {
                // fallback to DB fetch
            }
        }
        async function fetchItems() {
            setLoading(true);
            const data = await getItems();
            setFilteredItems(data);
            setLoading(false);
        }
        fetchItems();
    }, []);

    return (
            <div className="bg-white text-black p-8 print:p-0">
                <div className="flex items-center justify-between mb-8 no-print">
                    <h1 className="text-2xl font-bold">{t('export.title')}</h1>
                    <Button onClick={() => window.print()}>{t('export.print')}</Button>
                </div>
                {loading ? (
                    <div className="text-center py-8">Cargando...</div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No hay artículos para exportar.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center bg-gray-50">
                                <div className="mb-2 text-center">
                                    <p className="font-medium text-lg">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.sku}</p>
                                </div>
                                <div className="mb-2 text-xl font-bold text-blue-700">${item.price.toFixed(2)}</div>
                                <div className="flex justify-center mb-2">
                                    <Image
                                        alt={`QR Code for ${item.name}`}
                                        width={80}
                                        height={80}
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${item.sku}`}
                                        data-ai-hint="qr code"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-8 text-center text-sm text-gray-500">
                    {t('export.generatedOn')}: {new Date().toLocaleDateString()}
                </div>
            </div>
    );
}
