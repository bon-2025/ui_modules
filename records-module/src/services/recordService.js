// services/recordService.js

let recordsDB = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "cmis-capstone",
    cemeteryName: "Greenwood Cemetery",
    startDate: "2025-12-12",
    endDate: "2030-12-12",
    ageAtDeath: "0",
    cemeteryAddress: "qqqqq",
    cemeteryLot: "Lot A1",
    citizenship: "qqq",
    civilStatus: "Single",
    dateOfBirth: "2025-12-01",
    dateOfDeath: "2025-12-27",
    email: "canigetyourame@gmail.com",
    firstNameOfFather: "Jammy",
    firstNameOfMother: "Jammy",
    lastNameOfFather: "Ceasar",
    lastNameOfMother: "Ceasar",
    middleName: "Cute",
    middleNameOfFather: "Srnty",
    middleNameOfMother: "Srnty",
    phoneNumber: "09706314743",
    placeOfDeath: { barangay: "a", city: "Quirino", province: "Ilocos Sur", region: "Region I (Ilocos Region)" },
    residence: { barangay: "a", city: "City of Pasig", province: "Metro Manila", region: "National Capital Region (NCR)" },
    position: "qqq",
    religion: "qqqqq",
    sex: "Male",
    suffix: "ff",
    permitNumber: "111111111",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Maria",
    lastName: "Santos",
    cemeteryName: "Sunset Memorial",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    ageAtDeath: "2",
    cemeteryAddress: "456 Oak Ave",
    cemeteryLot: "Lot C1",
    citizenship: "Filipino",
    civilStatus: "Widowed",
    dateOfBirth: "2020-12-01",
    dateOfDeath: "2022-12-30",
    email: "maria.santos@example.com",
    firstNameOfFather: "Pedro",
    firstNameOfMother: "Ana",
    lastNameOfFather: "Santos",
    lastNameOfMother: "Diaz",
    middleName: "Luz",
    middleNameOfFather: "Ramos",
    middleNameOfMother: "Reyes",
    phoneNumber: "09123456789",
    placeOfDeath: { barangay: "a", city: "Vigan", province: "Ilocos Sur", region: "Region I (Ilocos Region)" },
    residence: { barangay: "a", city: "Metro Manila", province: "Metro Manila", region: "NCR" },
    position: "Manager",
    religion: "Christian",
    sex: "Female",
    suffix: "a",
    permitNumber: "222222222",
    status: "Active",
  },
];

// Fetch all records
export const fetchRecords = () =>
  new Promise((resolve) => setTimeout(() => resolve([...recordsDB]), 500));

// Archive a single record
export const archiveRecord = (id) =>
  new Promise((resolve) => {
    recordsDB = recordsDB.filter(r => r.id !== id);
    setTimeout(() => resolve({ success: true }), 300);
  });

// Bulk archive records by IDs
export const bulkArchiveRecords = (ids) =>
  new Promise((resolve) => {
    recordsDB = recordsDB.filter(r => !ids.includes(r.id));
    setTimeout(() => resolve({ success: true }), 300);
  });

// Save or update a record
export const saveRecord = (updatedRecord) =>
  new Promise((resolve) => {
    const exists = recordsDB.some(r => r.id === updatedRecord.id);

    if (exists) {
      // Update existing record
      recordsDB = recordsDB.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    } else {
      // Add new record
      const newId = recordsDB.length ? Math.max(...recordsDB.map(r => r.id)) + 1 : 1;
      updatedRecord.id = newId;
      recordsDB.push(updatedRecord);
    }

    setTimeout(() => resolve({ success: true, record: updatedRecord }), 300);
  });
