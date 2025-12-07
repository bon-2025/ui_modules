import { useState, useEffect } from "react";
import { cemeteries } from "../utils/fields";

export const useCemeteryLots = (selectedCemetery, setValue) => {
  const [lotOptions, setLotOptions] = useState([]);

  useEffect(() => {
    if (selectedCemetery) {
      const cemetery = cemeteries.find(c => c.id === Number(selectedCemetery));

      setValue("cemeteryAddress", cemetery?.address || "");

      const lots = cemetery?.lots.map(l => ({
        label: l.label,
        value: l.id
      })) || [];

      setLotOptions(lots);
      setValue("cemeteryLot", "");
    } else {
      setLotOptions([]);
      setValue("cemeteryAddress", "");
      setValue("cemeteryLot", "");
    }
  }, [selectedCemetery]);

  return lotOptions;
};
