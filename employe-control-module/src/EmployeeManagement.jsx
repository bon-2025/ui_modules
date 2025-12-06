import React, { useState, useMemo } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl, Alert, Card } from "react-bootstrap";
import { Eye, Pencil, Trash, PlusCircle } from "react-bootstrap-icons";
import { z } from "zod";

// Zod schema for validation
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const generatePassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", position: "Developer", email: "john@example.com", password: "123456" },
    { id: 2, name: "Jane Smith", position: "Designer", email: "jane@example.com", password: "abcdef" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", position: "", email: "", password: "" });
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // --- Modal Handlers ---
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({ name: "", position: "", email: "", password: "" });
  };

  const handleShowModal = (employee = null) => {
    setEditingEmployee(employee);
    if (employee) setFormData({ ...employee });
    else setFormData({ ...formData, password: generatePassword(8) });
    setShowModal(true);
  };

  const handleViewModal = (employee) => {
    setViewingEmployee(employee);
    setShowViewModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Confirm Modal ---
  const handleConfirm = (action, payload) => {
    setConfirmAction({ action, payload });
    setShowConfirm(true);
  };

  const executeAction = () => {
    const { action, payload } = confirmAction;
    if (action === "delete") {
      setEmployees(employees.filter((emp) => emp.id !== payload.id));
      setAlert({ type: "danger", message: `Employee "${payload.name}" deleted successfully.` });
    }
    if (action === "save") {
      const validation = employeeSchema.safeParse(payload);
      if (!validation.success) {
        setAlert({ type: "danger", message: validation.error.errors.map(e => e.message).join(", ") });
        setShowConfirm(false);
        return;
      }

      if (editingEmployee) {
        setEmployees(
          employees.map((emp) => (emp.id === editingEmployee.id ? { ...payload, id: emp.id } : emp))
        );
        setAlert({ type: "success", message: `Employee "${payload.name}" updated successfully.` });
      } else {
        setEmployees([...employees, { ...payload, id: Date.now() }]);
        setAlert({ type: "success", message: `Employee "${payload.name}" added successfully.` });
      }
    }
    setShowConfirm(false);
    handleCloseModal();
  };

  // --- Sorting ---
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    let sortable = [...employees];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable.filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.position.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, sortConfig, search]);

  // --- Pagination ---
  const pageCount = Math.ceil(sortedEmployees.length / pageSize);
  const paginatedEmployees = sortedEmployees.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className="container mt-5">
      {/* Alert */}
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({})} dismissible>
          {alert.message}
        </Alert>
      )}

      {/* Card Wrapper */}
      <Card className="p-3 shadow-sm mb-3">
        {/* Header */}
        <div className="d-flex flex-column align-items-center mb-3">
          {/* Title centered */}
          <h2 className="text-center mb-3">Employee Management</h2>

          {/* Add button + search input responsive */}
          <div className="d-flex flex-column flex-md-row gap-2 w-100 justify-content-center align-items-center">
            {/* Add Employee Button */}
            <Button
              variant="primary"
              onClick={() => handleShowModal()}
              className="d-flex align-items-center"
              style={{ fontSize: "0.85rem", padding: "0.35rem 0.7rem" }}
            >
              <PlusCircle className="me-1" style={{ fontSize: "1rem" }} /> Add Employee
            </Button>

            {/* Search Input */}
            <InputGroup style={{ minWidth: "250px", maxWidth: "400px", flex: "1" }}>
              <FormControl
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                style={{ fontSize: "1rem", padding: "0.5rem" }}
              />
            </InputGroup>
          </div>
        </div>

        {/* Table */}
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-primary">
            <tr>
              <th onClick={() => requestSort("name")}>
                Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
              </th>
              <th onClick={() => requestSort("position")}>
                Position {sortConfig.key === "position" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
              </th>
              <th onClick={() => requestSort("email")}>
                Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td className="d-flex flex-wrap gap-1">
                  <Button
                    variant="info"
                    size="sm"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.4rem" }}
                    onClick={() => handleViewModal(emp)}
                  >
                    <Eye style={{ fontSize: "0.85rem" }} /> View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.4rem" }}
                    onClick={() => handleShowModal(emp)}
                  >
                    <Pencil style={{ fontSize: "0.85rem" }} /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.4rem" }}
                    onClick={() => handleConfirm("delete", emp)}
                  >
                    <Trash style={{ fontSize: "0.85rem" }} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
          <Button variant="secondary" size="sm" disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</Button>
          <span>Page {currentPage + 1} of {pageCount}</span>
          <Button variant="secondary" size="sm" disabled={currentPage >= pageCount - 1} onClick={() => setCurrentPage(prev => prev + 1)}>Next</Button>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingEmployee ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" name="position" value={formData.position} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-2 align-items-center">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control type="text" name="password" value={formData.password} onChange={handleChange} />
              {!editingEmployee && (
                <Button variant="secondary" size="sm" onClick={() => setFormData({...formData, password: generatePassword(8)})}>
                  Generate
                </Button>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => handleConfirm("save", formData)}>
            {editingEmployee ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingEmployee && (
            <div>
              <p><strong>Name:</strong> {viewingEmployee.name}</p>
              <p><strong>Position:</strong> {viewingEmployee.position}</p>
              <p><strong>Email:</strong> {viewingEmployee.email}</p>
              <p><strong>Password:</strong> {viewingEmployee.password}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {confirmAction?.action === "delete" ? "delete" : "save"} this employee?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant={confirmAction?.action === "delete" ? "danger" : "primary"} size="sm" onClick={executeAction}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
