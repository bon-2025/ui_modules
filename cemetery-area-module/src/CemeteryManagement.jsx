import { useState } from "react";
import {
  Table,
  Button,
  Form,
  Card,
  Modal,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  Badge,
} from "react-bootstrap";
import { useCemeteries } from "./useCemeteries";

export default function CemeteryManagement() {
  const {
    cemeteries,
    loading,
    addCemetery,
    updateCemetery,
    deleteCemetery,
    addLot,
    deleteLot,
  } = useCemeteries();

  const [showForm, setShowForm] = useState(false);
  const [newCemetery, setNewCemetery] = useState({ name: "", address: "" });
  const [editingCemetery, setEditingCemetery] = useState(null);
  const [viewingCemetery, setViewingCemetery] = useState(null);
  const [newLotName, setNewLotName] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  if (loading) return <p>Loading cemeteries...</p>;

  // Handlers
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleAddCemetery = async () => {
    if (!newCemetery.name.trim() || !newCemetery.address.trim()) {
      showAlert("danger", "Name and address are required!");
      return;
    }
    await addCemetery(newCemetery);
    setNewCemetery({ name: "", address: "" });
    setShowForm(false);
    showAlert("success", "Cemetery added successfully!");
  };

  const handleEditCemetery = async () => {
    if (!editingCemetery?.name.trim() || !editingCemetery?.address.trim()) {
      showAlert("danger", "Name and address are required!");
      return;
    }
    await updateCemetery(editingCemetery.id, editingCemetery);
    setEditingCemetery(null);
    showAlert("success", "Cemetery updated successfully!");
  };

  const handleDeleteCemetery = async (id) => {
    if (window.confirm("Are you sure you want to delete this cemetery?")) {
      await deleteCemetery(id);
      showAlert("warning", "Cemetery deleted!");
    }
  };

  const handleAddLot = async () => {
    if (!newLotName.trim()) {
      showAlert("danger", "Lot name cannot be empty!");
      return;
    }
    await addLot(viewingCemetery.id, newLotName);
    setNewLotName("");
    showAlert("success", "Lot added successfully!");
  };

  const handleDeleteLot = async (lotName) => {
    if (window.confirm(`Delete lot "${lotName}"?`)) {
      await deleteLot(viewingCemetery.id, lotName);
      showAlert("warning", "Lot deleted!");
    }
  };

  return (
    <Container fluid className="my-4">
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Card className="p-3 shadow-sm">
        <Row className="align-items-center mb-3">
          <Col>
            <h2>Cemetery List</h2>
          </Col>
          <Col className="text-end">
            <Button onClick={() => setShowForm(true)}>+ Add New Cemetery</Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Lots</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cemeteries.map((cem) => (
              <tr key={cem.id}>
                <td>{cem.id}</td>
                <td>{cem.name}</td>
                <td>{cem.address}</td>
                <td>
                  {cem.lots.length
                    ? cem.lots.map((lot, i) => (
                        <Badge bg="secondary" className="me-1" key={i}>
                          {lot}
                        </Badge>
                      ))
                    : "No lots"}
                </td>
                <td className="d-flex flex-wrap gap-1">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => setViewingCemetery(cem)}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => setEditingCemetery(cem)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCemetery(cem.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add Cemetery Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Cemetery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cemetery Name</Form.Label>
              <Form.Control
                type="text"
                value={newCemetery.name}
                onChange={(e) =>
                  setNewCemetery({ ...newCemetery, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newCemetery.address}
                onChange={(e) =>
                  setNewCemetery({ ...newCemetery, address: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCemetery}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Cemetery Modal */}
      <Modal show={!!editingCemetery} onHide={() => setEditingCemetery(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cemetery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cemetery Name</Form.Label>
              <Form.Control
                type="text"
                value={editingCemetery?.name || ""}
                onChange={(e) =>
                  setEditingCemetery({
                    ...editingCemetery,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editingCemetery?.address || ""}
                onChange={(e) =>
                  setEditingCemetery({
                    ...editingCemetery,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingCemetery(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditCemetery}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Cemetery Modal */}
      <Modal show={!!viewingCemetery} onHide={() => setViewingCemetery(null)}>
        <Modal.Header closeButton>
          <Modal.Title>View Cemetery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>ID:</strong> {viewingCemetery?.id}
          </p>
          <p>
            <strong>Name:</strong> {viewingCemetery?.name}
          </p>
          <p>
            <strong>Address:</strong> {viewingCemetery?.address}
          </p>

          {/* Lots */}
          <div className="mb-3">
            <strong>Lots:</strong>
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {viewingCemetery?.lots.length ? (
                viewingCemetery?.lots.map((lot, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-center mb-1"
                  >
                    <span>{lot}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteLot(lot)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p>No lots added yet.</p>
              )}
            </div>

            {/* Add new lot */}
            <InputGroup className="mt-3">
              <Form.Control
                placeholder="New lot name"
                value={newLotName}
                onChange={(e) => setNewLotName(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddLot}>
                Add Lot
              </Button>
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewingCemetery(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
