import React, { useState } from "react";
import { Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { useRecords } from "../hooks/useRecords";
import { RecordModal } from "./RecordModal";
import { RecordsTable } from "./RecordsTable";
import { PaginationControl } from "./PaginationControl";
import { ConfirmModal } from "../shared/ConfirmModal";
import { ResponseModal } from "../shared/ResponseModal";

export default function ManagementRecord() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [responseModal, setResponseModal] = useState({ show: false, message: "", type: "success" });

  const {
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
    handleSelectAll,
    handleDeselectAll,
    handleArchive,
    handleBulkArchive,
    handleSave,
    fetchAllRecords
  } = useRecords();

  const showConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
  };

  const showResponse = (message, type = "success") => {
    setResponseModal({ show: true, message, type });
  };

  // Confirm bulk archive
  const handleBulkArchiveConfirm = () => {
    if (!selectedIds.length) {
      showResponse("No records selected for archive.", "error");
      return;
    }

    showConfirm(`Are you sure you want to archive ${selectedIds.length} record(s)?`, async () => {
      try {
        await handleBulkArchive();
        fetchAllRecords();
        showResponse("Selected records archived successfully!", "success");
      } catch {
        showResponse("Failed to archive selected records.", "error");
      }
    });
  };

  // Confirm single archive
  const handleArchiveSingleConfirm = (id) => {
    showConfirm("Are you sure you want to archive this record?", async () => {
      try {
        await handleArchive(id);
        fetchAllRecords();
        showResponse("Record archived successfully!", "success");
      } catch {
        showResponse("Failed to archive record.", "error");
      }
    });
  };

  // Save record (edit/add)
  const handleSaveRecord = (record) => {
    showConfirm("Are you sure you want to save changes?", async () => {
      try {
        await handleSave(record);
        showResponse("Record saved successfully!", "success");
        setShowModal(false);
        fetchAllRecords();
      } catch {
        showResponse("Failed to save record.", "error");
      }
    });
  };

  const handleView = (record) => { setSelectedRecord(record); setModalMode("view"); setShowModal(true); };
  const handleEdit = (record) => { setSelectedRecord(record); setModalMode("edit"); setShowModal(true); };
  const handleExtend = (record) => { setSelectedRecord(record); setModalMode("extend"); setShowModal(true); };
  const handleChange = (e) => { setSelectedRecord({ ...selectedRecord, [e.target.name]: e.target.value }); };

  return (
    <Card className="p-3 p-md-4 shadow-sm">
      <h3 className="mb-3 mb-md-4 text-center text-md-start">Management Records</h3>

      <div className="d-flex flex-column flex-md-row mb-3 justify-content-between gap-2">
        <InputGroup className="w-100 w-md-50">
          <FormControl
            placeholder="Search by Name or Cemetery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Button variant="danger" className="w-100 w-md-auto" onClick={handleBulkArchiveConfirm}>
          Archive Selected
        </Button>
      </div>

      <RecordsTable
        records={currentRecords}
        selectedIds={selectedIds}
        onSelect={handleSelectRecord}
        onSelectAll={() => handleSelectAll(currentRecords.map(r => r.id))}
        onDeselectAll={() => handleDeselectAll(currentRecords.map(r => r.id))}
        onView={handleView}
        onEdit={handleEdit}
        onExtend={handleExtend}
        onArchive={handleArchiveSingleConfirm}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <RecordModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode={modalMode}
        record={selectedRecord}
        onChange={handleChange}
        onSave={handleSaveRecord}
        onArchive={handleArchiveSingleConfirm}
      />

      <ConfirmModal
        show={!!confirmAction}
        onHide={() => setConfirmAction(null)}
        message={confirmMessage}
        onConfirm={confirmAction}
      />

      <ResponseModal
        show={responseModal.show}
        onHide={() => setResponseModal({ ...responseModal, show: false })}
        message={responseModal.message}
        type={responseModal.type}
      />
    </Card>
  );
}
