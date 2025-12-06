import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  regions as fetchRegions,
  provinces as fetchProvinces,
  cities as fetchCities,
  barangays as fetchBarangays,
} from "phil-address";

export default function AddressField({ field, register, watch, errors }) {
  const initial = watch(field.name);

  const [region, setRegion] = useState(initial?.region || "");
  const [province, setProvince] = useState(initial?.province || "");
  const [city, setCity] = useState(initial?.city || "");
  const [barangay, setBarangay] = useState(initial?.barangay || "");

  const [regionList, setRegionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  useEffect(() => {
    fetchRegions().then(setRegionList);
  }, []);

  useEffect(() => {
    if (!region) return;
    fetchProvinces(region).then(setProvinceList);
  }, [region]);

  useEffect(() => {
    if (!province) return;
    fetchCities(province).then(setCityList);
  }, [province]);

  useEffect(() => {
    if (!city) return;
    fetchBarangays(city).then(setBarangayList);
  }, [city]);

  console.log(errors)

  return (
    <>
      <div className="col-12 col-md-12">
        <Form.Label>{field.label} - Region</Form.Label>
        <Form.Select
          {...register(`${field.name}.region`)}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Select Region</option>
          {regionList.map((r) => (
            <option key={r.psgcCode} value={r.psgcCode}>
              {r.name}
            </option>
          ))}
        </Form.Select>
        {errors?.[field.name]?.region && (
          <Form.Text className="text-danger">
            {errors[field.name].region.message}
          </Form.Text>
        )}
      </div>

      <div className="col-12 col-md-12">
        <Form.Label>{field.label} - Province</Form.Label>
        <Form.Select
          {...register(`${field.name}.province`)}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          disabled={!region}
        >
          <option value="">Select Province</option>
          {provinceList.map((p) => (
            <option key={p.psgcCode || p.id} value={p.psgcCode || p.id}>
              {p.name}
            </option>
          ))}
        </Form.Select>
        {errors?.[field.name]?.province && (
          <Form.Text className="text-danger">
            {errors[field.name].province.message}
          </Form.Text>
        )}
      </div>

      <div className="col-12 col-md-12">
        <Form.Label>{field.label} - City/Municipality</Form.Label>
        <Form.Select
          {...register(`${field.name}.city`)}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!province}
        >
          <option value="">Select City</option>
          {cityList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Select>
        {errors?.[field.name]?.city && (
          <Form.Text className="text-danger">
            {errors[field.name].city.message}
          </Form.Text>
        )}
      </div>

      <div className="col-12 col-md-12">
        <Form.Label>{field.label} - Barangay</Form.Label>
        <Form.Select
          {...register(`${field.name}.barangay`)}
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
          disabled={!city}
        >
          <option value="">Select Barangay</option>
          {barangayList.map((b) => (
            <option key={b.psgcCode} value={b.psgcCode}>
              {b.name}
            </option>
          ))}
        </Form.Select>
        {errors?.[field.name]?.barangay && (
          <Form.Text className="text-danger">
            {errors[field.name].barangay.message}
          </Form.Text>
        )}
      </div>
    </>
  );
}
