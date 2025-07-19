"use client";
import { useEffect, useRef, useState } from "react";

type Dipendente = { id: string; name: string | null; email: string };

export default function AutocompleteDipendente({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [dipendenti, setDipendenti] = useState<Dipendente[]>([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/workers?role=DIPENDENTE")
      .then(res => res.json())
      .then(data => setDipendenti(data?.users || []));
  }, []);

  // 👇 Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    }
    if (showList) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showList]);

  // Filter logic
  const filtered = dipendenti.filter(d =>
    (d.name || "").toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  // What value to show in the input?
  let inputValue = search;
  if (value && !search) {
    const found = dipendenti.find(d => d.id === value);
    if (found) inputValue = found.name || found.email || "";
  }

  return (
    <div className="relative" ref={boxRef}>
      <label className="block text-sm font-semibold mb-1">Assegna a dipendente</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="Cerca dipendente per nome o email"
        value={inputValue}
        onFocus={() => setShowList(true)}
        onChange={e => {
          setSearch(e.target.value);
          setShowList(true);
          onChange(""); // Reset ID if typing
        }}
        autoComplete="off"
      />
      <input type="hidden" name="responsabileId" value={value} />
      {showList && filtered.length > 0 && (
        <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow max-h-40 overflow-auto">
          {filtered.map(d => (
            <div
              key={d.id}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => {
                onChange(d.id);
                setSearch("");
                setShowList(false);
              }}
            >
              {d.name || d.email} <span className="text-xs text-gray-500">({d.email})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
