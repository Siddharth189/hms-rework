import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEmployee from "./Employee/AddEmployee";
import RemoveEmployee from "./Employee/RemoveEmployee";
import PresentEmployee from "./Employee/PresentEmployee";
import SeeAllEmployee from "./Employee/SeeAllEmployee";
import MarkAttendance from "./Employee/MarkAttendance";

const EmployeeManagement = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [removeEmployee, setRemoveEmployee] = useState(false);
  const [presentEmployee, setPresentEmployee] = useState(false);
  const [seeAllEmployee, setSeeAllEmployee] = useState(false);
  const [markEmployee, setMarkEmployee] = useState(false);

  const token = useSelector((store) => store.auth.token);
  if (token === null) {
    return (
      <div className="flex-row">
        <h1>It seems that your are not logged in!</h1>
        <Link to={"/auth"} className="nav-btn">
          Head over here to Login
        </Link>
      </div>
    );
  }

  const handleAddClick = () => {
    setAddEmployee(!addEmployee);
    setPresentEmployee(false);
    setRemoveEmployee(false);
    setSeeAllEmployee(false);
    setMarkEmployee(false);
  };
  const handleRemoveClick = () => {
    setRemoveEmployee(!removeEmployee);
    setPresentEmployee(false);
    setAddEmployee(false);
    setSeeAllEmployee(false);
    setMarkEmployee(false);
  };
  const handlePresentClick = () => {
    setPresentEmployee(!presentEmployee);
    setAddEmployee(false);
    setRemoveEmployee(false);
    setSeeAllEmployee(false);
    setMarkEmployee(false);
  };
  const handleSeeAllClick = () => {
    setSeeAllEmployee(!seeAllEmployee);
    setPresentEmployee(false);
    setRemoveEmployee(false);
    setAddEmployee(false);
    setMarkEmployee(false);
  };

  const handleMarkClick = () => {
    setMarkEmployee(!markEmployee);
    setSeeAllEmployee(false);
    setPresentEmployee(false);
    setRemoveEmployee(false);
    setAddEmployee(false);
  };

  return (
    <div className="admin-management-page flex-column">
      <div className="admin-management-page-heading">Employee Management</div>
      <div className="admin-management-page-content">
        <button className="user-btn" onClick={() => handleAddClick()}>
          Add an employee
        </button>
        <button className="user-btn" onClick={() => handleRemoveClick()}>
          Remove an employee
        </button>
        <button className="user-btn" onClick={() => handlePresentClick()}>
          See present employees
        </button>
        <button className="user-btn" onClick={() => handleSeeAllClick()}>
          See all employees
        </button>
        <button className="user-btn" onClick={() => handleMarkClick()}>
          MARK THE ATTENDANCE
        </button>
      </div>
      <div className="admin-management-page-forms">
        {addEmployee && <AddEmployee />}
        {removeEmployee && <RemoveEmployee />}
        {presentEmployee && <PresentEmployee />}
        {seeAllEmployee && <SeeAllEmployee />}
        {markEmployee && <MarkAttendance />}
      </div>
    </div>
  );
};

export default EmployeeManagement;
