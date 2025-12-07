// utils/ageUtils.js
export function formatAge(dob, referenceDate) {
  if (!dob || !referenceDate) return "";

  const birth = new Date(dob);
  const ref = new Date(referenceDate);

  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  const days = ref.getDate() - birth.getDate();

  if (days < 0) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    return "1 month";
  }
}
