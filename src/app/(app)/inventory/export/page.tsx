
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Re-using the same hardcoded data from the main inventory page
const items = [
  { id: "1", name: "Laser-Guided Widget", sku: "LGW-001", stock: 120, price: 49.99, status: "in-stock", category: "Widgets", description: "A high-precision widget with laser guidance for optimal performance.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [{ url: 'https://picsum.photos/seed/LGW-001/600/600', alt: 'Main view' }] },
  { id: "2", name: "Hyper-Flux Capacitor", sku: "HFC-002", stock: 15, price: 199.99, status: "low-stock", category: "Capacitors", description: "A state-of-the-art capacitor designed for temporal displacement and high-energy applications.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [ { url: 'https://picsum.photos/seed/HFC-002-1/600/600', alt: 'Main view' }, { url: 'https://picsum.photos/seed/HFC-002-2/600/600', alt: 'Side view' }, { url: 'https://picsum.photos/seed/HFC-002-3/600/600', alt: 'In-use' }] },
  { id: "3", name: "Quantum Sprocket", sku: "QS-003", stock: 0, price: 99.99, status: "out-of-stock", category: "Sprockets", description: "A sprocket that operates on quantum principles, allowing for near-frictionless rotation.", supplier: { id: "2", name: "Quantum Innovations" }, images: [{ url: 'https://picsum.photos/seed/QS-003/600/600', alt: 'Main view' }] },
  { id: "4", name: "Nano-Enhanced Gear", sku: "NEG-004", stock: 75, price: 29.99, status: "in-stock", category: "Gears", description: "A gear infused with nanobots for self-repair and enhanced durability.", supplier: { id: "4", name: "Apex Machining" }, images: [{ url: 'https://picsum.photos/seed/NEG-004/600/600', alt: 'Main view' }] },
  { id: "5", name: "Chrono-Stabilizer Unit", sku: "CSU-005", stock: 30, price: 349.99, status: "in-stock", category: "Stabilizers", description: "A device that stabilizes temporal fields, essential for any time-traveling apparatus.", supplier: { id: "1", name: "FutureTech Dynamics" }, images: [{ url: 'https://picsum.photos/seed/CSU-005/600/600', alt: 'Main view' }] },
  { id: "6", name: "Plasma-Infused Screw", sku: "PIS-006", stock: 8, price: 2.99, status: "low-stock", category: "Fasteners", description: "A screw coated in a thin layer of plasma for superior grip and heat resistance.", supplier: { id: "3", name: "Stellar Components Co." }, images: [{ url: 'https://picsum.photos/seed/PIS-006/600/600', alt: 'Main view' }] },
];

export default function ExportPage() {
  return (
    <div className="bg-white text-black p-8 print:p-0">
        <style jsx global>{`
            @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .no-print { display: none; }
                @page { margin: 0.5in; }
            }
        `}</style>
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
