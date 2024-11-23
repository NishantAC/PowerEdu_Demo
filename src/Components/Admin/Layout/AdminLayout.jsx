import Routes from "../Sidebar/Routes"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLayout() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        return;
    }, [user]);
    return (
        <div>
            <Routes/>
        </div>
    )
}

export default AdminLayout
