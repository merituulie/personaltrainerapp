import React from 'react';
import { Link } from 'react-router-dom';
 
export default function Navigator() {
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg -light">
            <div className="collapsenavbar-collapse" id ="navbarSupportedContent">
                <ul className="navbar-navmr-auto">
                    <li className="nav -item active">
                        <Link className="nav-link"to="/CustomerList" >Customers</Link>
                    </li>
                    <li  className="nav -item">
                        <Link className="nav-link"to="/TrainingList">Trainings</Link>
                    </li>
                </ul>
            </div>
        </nav>
</div>
    );
}