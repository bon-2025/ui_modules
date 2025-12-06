import { useState, useEffect, useMemo } from "react";
import { fetchRecords, archiveRecord, bulkArchiveRecords, saveRecord } from "../services/recordService";

export const useRecords = (pageSize = 5) => {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all records
  const loadRecords = async () => {
    const data = await fetchRecords();
    setRecords(data);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const fetchAllRecords = async () => {
    await loadRecords();
  };

  // Sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedRecords = useMemo(() => {
    let sortable = [...records];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aVal = (a[sortConfig.key] || "").toString().toLowerCase();
        const bVal = (b[sortConfig.key] || "").toString().toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [records, sortConfig]);

  // Search/filter
  const filteredRecords = useMemo(() => {
    if (!searchQuery) return sortedRecords;
    const query = searchQuery.toLowerCase();
    return sortedRecords.filter(
      r => `${r.firstName} ${r.lastName}`.toLowerCase().includes(query) || r.cemeteryName.toLowerCase().includes(query)
    );
  }, [sortedRecords, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / pageSize);
  const currentRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Selecting records
  const handleSelectRecord = (idOrIds, checked) => {
    if (Array.isArray(idOrIds)) {
      // Bulk select/deselect
      setSelectedIds(prev => {
        if (checked) return [...new Set([...prev, ...idOrIds])];
        return prev.filter(id => !idOrIds.includes(id));
      });
    } else {
      // Single select/deselect
      setSelectedIds(prev => {
        const alreadySelected = prev.includes(idOrIds);
        if (checked === undefined) {
          return alreadySelected ? prev.filter(i => i !== idOrIds) : [...prev, idOrIds];
        }
        if (checked) {
          if (!alreadySelected) return [...prev, idOrIds];
          return prev;
        } else {
          if (alreadySelected) return prev.filter(i => i !== idOrIds);
          return prev;
        }
      });
    }
  };

  // Archive single record
  const handleArchive = async (id) => {
    await archiveRecord(id);
    await loadRecords();
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  // Bulk archive
  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return;
    await bulkArchiveRecords(selectedIds);
    await loadRecords();
    setSelectedIds([]);
  };

  // Save record (edit or add)
  const handleSave = async (record) => {
    await saveRecord(record);
    await loadRecords();
  };

  return {
    currentRecords,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    sortConfig,
    requestSort,
    selectedIds,
    handleSelectRecord,
    handleArchive,
    handleBulkArchive,
    handleSave,
    fetchAllRecords, // for external refresh
  };
};
