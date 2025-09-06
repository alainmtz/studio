import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";
import type { Supplier } from "@/data/suppliers";

export function SupplierForm({ supplier, onSubmit, onCancel }: {
  supplier?: Supplier;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: supplier?.name ?? "",
    contact_person: supplier?.contact_person ?? "",
    email: supplier?.email ?? "",
    phone: supplier?.phone ?? "",
  });

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name ?? "",
        contact_person: supplier.contact_person ?? "",
        email: supplier.email ?? "",
        phone: supplier.phone ?? "",
      });
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder={t('suppliers.name')}
        className="border rounded px-2 py-1"
      />
      <input
        name="contact_person"
        value={form.contact_person}
        onChange={handleChange}
        placeholder={t('suppliers.contactPerson')}
        className="border rounded px-2 py-1"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder={t('suppliers.email')}
        className="border rounded px-2 py-1"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder={t('suppliers.phone')}
        className="border rounded px-2 py-1"
      />
      <DialogFooter>
        <Button type="submit">{t('common.save')}</Button>
        <Button variant="outline" type="button" onClick={onCancel}>{t('common.cancel')}</Button>
      </DialogFooter>
    </form>
  );
}
