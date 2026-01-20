import { useMemo, useState } from "react";

export function useColumnPrefs<T extends { field: string }>(
  storageKey: string,
  columns: T[]
) {
  const saved = localStorage.getItem(storageKey);

  const [visibleFields, setVisibleFields] = useState<string[]>(
    saved ? JSON.parse(saved) : columns.map((c) => c.field)
  );

  const toggleField = (field: string) => {
    const next = visibleFields.includes(field)
      ? visibleFields.filter((f) => f !== field)
      : [...visibleFields, field];

    setVisibleFields(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const visibleColumns = useMemo(
    () => columns.filter((c) => visibleFields.includes(c.field)),
    [columns, visibleFields]
  );

  return {
    visibleColumns,
    visibleFields,
    toggleField,
  };
}
