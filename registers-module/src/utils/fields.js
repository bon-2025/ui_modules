// STEP 1 — PERSONAL INFORMATION
export const personalInfoFields = [
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "firstName", label: "First Name", type: "text" },
  { name: "middleName", label: "Middle Name", type: "text" },
  { name: "suffix", label: "Suffix Name", type: "text" },

  { name: "sex", label: "Sex", type: "select", options: ["Male", "Female"] },

  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "dateOfDeath", label: "Date of Death", type: "date" },

  { name: "ageAtDeath", label: "Age at Death", type: "text", disabled: true },

  { name: "citizenship", label: "Citizenship", type: "text" },
  { name: "religion", label: "Religion", type: "text" },
  {
    name: "civilStatus",
    label: "Civil Status",
    type: "select",
    options: ["Single", "Married", "Widowed", "Separated"],
  },
];

// STEP 1 — PARENTS' INFORMATION
export const parentInfoFields = [
  { name: "firstNameOfFather", label: "Father's First Name", type: "text" },
  { name: "middleNameOfFather", label: "Father's Middle Name", type: "text" },
  { name: "lastNameOfFather", label: "Father's Last Name", type: "text" },

  { name: "firstNameOfMother", label: "Mother's First Name", type: "text" },
  { name: "middleNameOfMother", label: "Mother's Middle Name", type: "text" },
  { name: "lastNameOfMother", label: "Mother's Last Name", type: "text" },
];

// STEP 1 — ADDRESSES
export const addressFields = [
  { name: "residence", label: "Residence Address", type: "address" },
  { name: "placeOfDeath", label: "Place of Death", type: "address" },
  { name: "cemeteryAddress", label: "Address of Cemetery", type: "text" },
];

// FINAL STEP 1 EXPORT
export const step1Fields = [
  { section: "Personal Information Of Deceased Person", fields: personalInfoFields },
  { section: "Parents Information", fields: parentInfoFields },
  { section: "Addresses", fields: addressFields },
];

export const cemeteries = [
  { id: 1, name: "Greenwood Cemetery", address: "123 Main St", lots: ["Lot A1", "Lot A2", "Lot B1"] },
  { id: 2, name: "Sunset Memorial", address: "456 Oak Ave", lots: ["Lot C1", "Lot C2"] },
  { id: 3, name: "Peaceful Rest", address: "789 Pine Rd", lots: [] },
];

export const contractInfoFields = [
  { name: "permitNumber", label: "Burial Permit Number", type: "text" },
  { 
    name: "cemeteryName", 
    label: "Cemetery Name", 
    type: "cemetery", 
    options: cemeteries.map(c => ({ label: c.name, value: c.name })) 
  },
 // { name: "cemeteryLocation", label: "Cemetery Location", type: "text" },
  { name: "startDate", label: "Start Date / Date of Internment", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { 
    name: "cemeteryLot", 
    label: "Cemetery Lot", 
    type: "select", 
    options: []
  },
]; 
export const contactInfoFields = [
  { name: "firstName", label: "Contact First Name", type: "text" },
  { name: "middleName", label: "Contact Middle Name", type: "text" },
  { name: "lastName", label: "Contact Last Name", type: "text" },
  { name: "suffix", label: "Suffix Name", type: "text" },
  { name: "position", label: "Position", type: "text" },
  { name: "phoneNumber", label: "Contact Number", type: "text" },
  { name: "email", label: "Email Address", type: "text" },
]


export const step2Fields = [
  { section: "Contract Information", fields: contractInfoFields },
];
export const step3Fields = [
  { section: "Bereave Family Information", fields: contactInfoFields },
];

// All Form Steps
export const formSteps = [
  step1Fields,
  step2Fields,
  step3Fields
];
