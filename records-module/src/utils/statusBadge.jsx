// src/utils/statusBadge.jsx
import React from "react";
import { Badge } from "react-bootstrap";

export const StatusBadge = ({ status }) => {
  switch (status) {
    case "Active": return <Badge bg="success">{status}</Badge>;
    case "Expired": return <Badge bg="warning">{status}</Badge>;
    case "Archived": return <Badge bg="secondary">{status}</Badge>;
    case "Expiring": return <Badge bg="danger">{status}</Badge>;
    case "Renewed": return <Badge bg="info">{status}</Badge>;
    default: return <Badge bg="light">{status}</Badge>;
  }
};
