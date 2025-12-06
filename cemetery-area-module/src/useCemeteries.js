import { useState, useEffect } from "react";

// Initial dummy cemeteries with lots
const initialCemeteries = [
  {
    id: 1,
    name: "Greenwood Cemetery",
    address: "123 Main St",
    lots: ["Lot A1", "Lot A2", "Lot B1"],
  },
  {
    id: 2,
    name: "Sunset Memorial",
    address: "456 Oak Ave",
    lots: ["Lot C1", "Lot C2"],
  },
  {
    id: 3,
    name: "Peaceful Rest",
    address: "789 Pine Rd",
    lots: [],
  },
];

let nextId = 4; // for new cemetery IDs

export function useCemeteries() {
  const [cemeteries, setCemeteries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch with timeout
    const timer = setTimeout(() => {
      setCemeteries(initialCemeteries);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Add a new cemetery
  const addCemetery = async (cemetery) => {
    const newCemetery = { ...cemetery, id: nextId++, lots: [] };
    setCemeteries((prev) => [...prev, newCemetery]);
  };

  // Update existing cemetery
  const updateCemetery = async (id, updatedCemetery) => {
    setCemeteries((prev) =>
      prev.map((cem) =>
        cem.id === id ? { ...cem, ...updatedCemetery } : cem
      )
    );
  };

  // Delete a cemetery
  const deleteCemetery = async (id) => {
    setCemeteries((prev) => prev.filter((cem) => cem.id !== id));
  };

  // Add a lot to a cemetery
  const addLot = async (cemeteryId, lotName) => {
    setCemeteries((prev) =>
      prev.map((cem) =>
        cem.id === cemeteryId
          ? { ...cem, lots: [...cem.lots, lotName] }
          : cem
      )
    );
  };

  // Delete a lot from a cemetery
  const deleteLot = async (cemeteryId, lotName) => {
    setCemeteries((prev) =>
      prev.map((cem) =>
        cem.id === cemeteryId
          ? { ...cem, lots: cem.lots.filter((lot) => lot !== lotName) }
          : cem
      )
    );
  };

  return {
    cemeteries,
    loading,
    addCemetery,
    updateCemetery,
    deleteCemetery,
    addLot,
    deleteLot,
  };
}
