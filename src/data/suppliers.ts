
export const suppliers = [
    { id: "1", name: "FutureTech Dynamics", contactPerson: "Dr. Evelyn Reed", email: "e.reed@futuretech.io", phone: "+1-202-555-0145", itemsSupplied: 12 },
    { id: "2", name: "Quantum Innovations", contactPerson: "Marcus Thorne", email: "marcus.t@qi.com", phone: "+1-202-555-0189", itemsSupplied: 5 },
    { id: "3", name: "Stellar Components Co.", contactPerson: "Lila Chen", email: "l.chen@stellarcomp.net", phone: "+1-202-555-0122", itemsSupplied: 34 },
    { id: "4", name: "Apex Machining", contactPerson: "Javier Morales", email: "javi@apexmach.com", phone: "+1-202-555-0167", itemsSupplied: 8 },
    { id: "5", name: "BioSynth Labs", contactPerson: "Dr. Aris Thorne", email: "aris.t@biosynth.dev", phone: "+1-202-555-0193", itemsSupplied: 21 },
  ];
  
  export type Supplier = (typeof suppliers)[0];
  