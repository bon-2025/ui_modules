// Simple fields with sections
export const simpleFields = [
  { name: "firstName", label: "First Name", section: "Base Info" },
  { name: "lastName", label: "Last Name", section: "Base Info"},
  { name: "middleName", label: "Middle Name", section: "Base Info" },
  { name: "suffix", label: "Suffix", section: "Base Info" },

  { name: "cemeteryName", label: "Cemetery Name", section: "Cemetery Info" },
  { name: "cemeteryAddress", label: "Cemetery Address", section: "Cemetery Info" },
  { name: "cemeteryLot", label: "Cemetery Lot", section: "Cemetery Info" },
  { name: "permitNumber", label: "Permit Number", section: "Cemetery Info", disabled: true },

  { name: "startDate", label: "Start Date", type: "date", section: "Dates & Age" },
  { name: "endDate", label: "End Date", type: "date", section: "Dates & Age" },
  { name: "ageAtDeath", label: "Age at Death", section: "Dates & Age" },

  { name: "dateOfBirth", label: "Date of Birth", type: "date", section: "Birth & Death Info", disabled: true },
  { name: "dateOfDeath", label: "Date of Death", type: "date", section: "Birth & Death Info", disabled: true },

  { name: "email", label: "Email", type: "email", section: "Contact & Position" },
  { name: "phoneNumber", label: "Phone Number", section: "Contact & Position" },
  { name: "position", label: "Position", section: "Contact & Position" },

  { name: "religion", label: "Religion", section: "Additional Info" },
  { name: "sex", label: "Sex", section: "Additional Info" },
  { name: "civilStatus", label: "Civil Status", section: "Additional Info" },
  { name: "citizenship", label: "Citizenship", section: "Additional Info" },

  { name: "firstNameOfFather", label: "Father's First Name", section: "Parents Info" },
  { name: "lastNameOfFather", label: "Father's Last Name", section: "Parents Info" },
  { name: "middleNameOfFather", label: "Father's Middle Name", section: "Parents Info" },
  { name: "firstNameOfMother", label: "Mother's First Name", section: "Parents Info" },
  { name: "lastNameOfMother", label: "Mother's Last Name", section: "Parents Info" },
  { name: "middleNameOfMother", label: "Mother's Middle Name", section: "Parents Info" },
];

// Nested fields as objects
export const nestedFields = [
  {
    parent: "placeOfDeath",
    label: "Place of Death",
    section: "Address Info",
    fields: [
      { name: "barangay", label: "Barangay" },
      { name: "city", label: "City" },
      { name: "province", label: "Province" },
      { name: "region", label: "Region" },
    ],
    mapField: true,
    coords: { lat: 14.583, lng: 120.386 },
  },
  {
    parent: "residence",
    label: "Residence",
    section: "Address Info",
    fields: [
      { name: "barangay", label: "Barangay" },
      { name: "city", label: "City" },
      { name: "province", label: "Province" },
      { name: "region", label: "Region" },
    ],
  },
];
