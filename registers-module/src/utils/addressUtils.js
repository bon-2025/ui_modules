import { regions, provinces, cities, barangays } from "phil-address";

export const convertAddress = async (addr) => {
  if (!addr) return null;

  const regList = await regions();
  const provList = await provinces(addr.region);
  const cityList = await cities(addr.province);
  const brgyList = await barangays(addr.city);

  return {
    region: regList.find(r => r.psgcCode === addr.region)?.name || "",
    province: provList.find(p => p.psgcCode === addr.province || p.id === addr.province)?.name || "",
    city: cityList.find(c => c.psgcCode === addr.city || c.id === addr.city)?.name || "",
    barangay: brgyList.find(b => b.id === addr.barangay)?.name || "",
  };
};
