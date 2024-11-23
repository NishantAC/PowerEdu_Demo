import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function RoutesComponent() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes in Layout */}
        <Route path="/" element={<Layout />}>


          {/* Redirect to teacher home if no matching route */}
          <Route path="*" element={<Navigate to="/teacher/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
