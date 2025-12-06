import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { StatusBadge } from "../utils/statusBadge.jsx";

export const RecordsTable = ({
  records,
  selectedIds = [],
  onSelect,
  onView,
  onEdit,
  onExtend,
  onArchive,
  sortConfig,
  requestSort
}) => {

  const allSelected = records.length > 0 && records.every(r => selectedIds.includes(r.id));

  return (
    <Table striped bordered hover responsive className="shadow-sm">
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={allSelected}
              onChange={(e) => {
                const checked = e.target.checked;
                records.forEach(r => onSelect(r.id, checked));
              }}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th className="d-none d-md-table-cell">Cemetery</th>
          <th className="d-none d-md-table-cell">Start Date</th>
          <th className="d-none d-md-table-cell">End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => {
          let rowClass = "";
          if (record.status === "Expiring") rowClass = "table-warning";
          else if (record.status === "Expired") rowClass = "table-danger";
          else if (record.status === "Archived") rowClass = "table-secondary";

          return (
            <tr key={record.id} className={rowClass}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedIds.includes(record.id)}
                  onChange={() => onSelect(record.id)}
                />
              </td>
              <td>{record.id}</td>
              <td>{record.firstName} {record.lastName}</td>
              <td className="d-none d-md-table-cell">{record.cemeteryName}</td>
              <td className="d-none d-md-table-cell">{record.startDate}</td>
              <td className="d-none d-md-table-cell">{record.endDate}</td>
              <td><StatusBadge status={record.status} /></td>
              <td className="d-flex flex-wrap gap-1">
                <Button size="sm" variant="info" onClick={() => onView(record)}>View</Button>
                <Button size="sm" variant="primary" onClick={() => onEdit(record)}>Edit</Button>
                <Button size="sm" variant="warning" onClick={() => onExtend(record)}>Extend</Button>
                <Button size="sm" variant="danger" onClick={() => onArchive(record.id)}>Archive</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
