import React from "react";
import { CRow, CCol } from "@coreui/react";
import PropTypes from "prop-types";
import LineChartWidget from "./LineChartWidget";

/**
 * TopWidgetGroup
 * Renders a grid of summary widgets (Total / Active / Pending / Inactive)
 * Uses LineChartWidget internally for each item.
 */
export const TopWidgetGroup = ({ widgets }) => {
  return (
    <CRow className="p-3">
      {widgets.map((widget, idx) => (
        <CCol sm={3} xs={6} key={idx} className="mb-3">
          <LineChartWidget {...widget} />
        </CCol>
      ))}
    </CRow>
  );
};

TopWidgetGroup.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
