// STEP 1 — PERSONAL INFORMATION
export const personalInfoFields = [
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "firstName", label: "First Name", type: "text" },
  { name: "middleName", label: "Middle Name", type: "text" },
  { name: "suffix", label: "Suffix Name", type: "text" },
  { name: "sex", label: "Sex", type: "select", options: ["MALE", "FEMALE", "OTHER"] },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "dateOfDeath", label: "Date of Death", type: "date" },
  { name: "ageAtDeath", label: "Age at Death", type: "text", disabled: true },
  { name: "citizenship", label: "Citizenship", type: "text" },
  { name: "religion", label: "Religion", type: "text" },
  {
    name: "civilStatus",
    label: "Civil Status",
    type: "select",
    options: ["SINGLE", "MARRIED", "WIDOWED", "DIVORCED", "SEPARATED", "OTHER"],
  },
   { name: "occupation", label: "Occupation", type: "text" },
];

// STEP 1 — PARENTS' INFORMATION
export const parentInfoFields = [
  { name: "firstNameOfFather", label: "Father's First Name", type: "text" },
  { name: "middleNameOfFather", label: "Father's Middle Name", type: "text" },
  { name: "lastNameOfFather", label: "Father's Last Name", type: "text" },
  { name: "firstNameOfMother", label: "Mother's First Name", type: "text" },
  { name: "middleNameOfMother", label: "Mother's Middle Name", type: "text" },
  { name: "lastNameOfMother", label: "Mother's Last Name", type: "text" },
  { name: "causeOfDeath", label: "Cause's Of Death", type: "text" },
];

export const residentAddress = [
  { name: "residence", label: "Residence Address", type: "address" },
];
export const placeOfDeath = [
 { name: "placeOfDeath", label: "Place of Death", type: "address" },
];

// FINAL STEP 1 EXPORT
export const step1Fields = [
  { section: "Personal Information Of Deceased Person", fields: personalInfoFields },
  { section: "Parents Information", fields: parentInfoFields },
  { section: "Residence Address", fields: residentAddress },
  { section: "Place Of Death", fields: placeOfDeath },
  //{ section: "Address Of Cemetery", fields: addressOfCemetery },
];

export const cemeteries = [
  { 
    id: 1, 
    name: "Greenwood Cemetery", 
    address: "123 Main St", 
    lots: [
      { id: 101, label: "Lot A1" },
      { id: 102, label: "Lot A2" },
      { id: 103, label: "Lot B1" },
    ]
  },
  { 
    id: 2, 
    name: "Sunset Memorial", 
    address: "456 Oak Ave", 
    lots: [
      { id: 201, label: "Lot C1" },
      { id: 202, label: "Lot C2" },
    ]
  },
  { 
    id: 3, 
    name: "Peaceful Rest", 
    address: "789 Pine Rd", 
    lots: [] 
  },
];


export const contractInfoFields = [
  { name: "permitNumber", label: "Burial Permit Number", type: "text", placeholder: "XXXXXXXXX" },
  { name: "cemeteryName", label: "Cemetry Name", type: "text" },
  { name: "startDate", label: "Start Date / Date of Internment", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "disposition", label: "Disposition Of Remains", type: "text" },
  { 
    name: "infectious", 
    label: "Infectious", 
    type: "select", 
    options: ["Yes", "No"]  
  },
  { 
    name: "bodyEmbalmed", 
    label: "Body Embalmed", 
    type: "select", 
    options: ["Yes", "No"] 
  },
  { 
    name: "cemeteryArea", 
    label: "Cemetery Area", 
    type: "cemetery", 
    options: cemeteries.map(c => ({ label: c.name, value: c.id })) 
  },
  {
    name: "cemeteryLot",
    label: "Cemetery Lot",
    type: "lot",
    options: [] // dynamically replaced
  }

]; 
export const contactInfoFields = [
  { name: "contactFirstName", label: "Contact First Name", type: "text" },
  { name: "contactMiddleName", label: "Contact Middle Name", type: "text" },
  { name: "contactLastName", label: "Contact Last Name", type: "text" },
  { name: "contactSuffix", label: "Suffix Name", type: "text" },
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
