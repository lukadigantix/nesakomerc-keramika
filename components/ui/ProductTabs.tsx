"use client";

import { useState } from "react";

interface Props {
  description: string;
  productName: string;
  categoryLabel: string;
  specs: [string, string][];
}

const TABS = ["Opis proizvoda", "Tehničke karakteristike"] as const;

export default function ProductTabs({ description, productName, categoryLabel, specs }: Props) {
  const [active, setActive] = useState<(typeof TABS)[number]>("Opis proizvoda");

  return (
    <div className="mt-10 sm:mt-16">
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-zinc-200 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative px-6 py-3.5 text-sm font-medium transition-colors duration-150"
              style={{ color: isActive ? "#e11d1b" : "#71717a" }}
            >
              {tab}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                  style={{ backgroundColor: "#e11d1b" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="pt-8 pb-16">
        {active === "Opis proizvoda" && (
          <div className="flex flex-col gap-4 text-sm text-zinc-500 leading-relaxed">
            <p>{description}</p>
            <p>
              Zahvaljujući pažljivo isplaniranim dimenzijama i intuitivnoj ugradnji,{" "}
              {productName} se lako integriše u svaki kupatilski prostor — bez obzira na stil i
              veličinu.
            </p>
            <p>
              Svaki komad prolazi kroz rigoroznu kontrolu kvaliteta pre isporuke, uz garanciju
              proizvođača i punu tehničku podršku tima Nesa Komerc Keramika.
            </p>
          </div>
        )}

        {active === "Tehničke karakteristike" && (
          <div className="w-full">
            {specs.map(([key, val]) => (
              <div
                key={key}
                className="flex justify-between text-sm py-3 border-b border-zinc-100"
              >
                <span className="text-zinc-400">{key}</span>
                <span className="text-zinc-950 font-medium">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
