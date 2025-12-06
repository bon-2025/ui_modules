import React from "react";
import { CRow, CCol, CWidgetStatsB } from "@coreui/react";
import PropTypes from "prop-types";

/**
 * StatusWidgetGroup
 * Renders a row of CoreUI progress widgets (e.g., Renewable / Expiring / Expired)
 */
export const StatusWidgetGroup = ({ widgets }) => {
  return (
    <div className="container-fluid bg-light p-3 border border-dark-subtle">
      <CRow>
        {widgets.map((w, idx) => (
          <CCol xs={12} sm={6} md={3} className="mb-3" key={idx}>
            <CWidgetStatsB
              className="modern-widget"
              progress={{ color: w.color, value: w.progress }}
              title={w.title}
              value={w.value}
            />
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

StatusWidgetGroup.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      progress: PropTypes.number,
    })
  ).isRequired,
};
