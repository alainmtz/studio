
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { items } from '@/data/items';

export default function ExportPage() {
  return (
    <div className="bg-white text-black p-8 print:p-0">
        <div className="flex items-center justify-between mb-8 no-print">
            <h1 className="text-2xl font-bold">Export Inventory</h1>
            <Button onClick={() => window.print()}>Print</Button>
        </div>
        <div className="space-y-4">
            <div className="grid grid-cols-[1fr,100px,100px] gap-4 font-bold border-b pb-2">
                <div>Name</div>
                <div className="text-right">Price</div>
                <div className="text-center">QR Code</div>
            </div>
            {items.map(item => (
                <div key={item.id} className="grid grid-cols-[1fr,100px,100px] gap-4 items-center border-b py-2">
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                    </div>
                    <div className="text-right">${item.price.toFixed(2)}</div>
                    <div className="flex justify-center">
                        <Image
                            alt={`QR Code for ${item.name}`}
                            width="80"
                            height="80"
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${item.sku}`}
                            data-ai-hint="qr code"
                        />
                    </div>
                </div>
            ))}
        </div>
         <div className="mt-8 text-center text-sm text-gray-500">
            Generated on: {new Date().toLocaleDateString()}
        </div>
    </div>
  );
}
