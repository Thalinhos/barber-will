import { useEffect, useState } from "react";
import { middlewareToken } from "../../utils/middleware";
import { useNavigate } from "react-router-dom";

function DashboardContent() {
    return (
        <div>
            dashboard
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const checkToken = async () => {
            const isValid = await middlewareToken(navigate);
            if (isMounted && isValid) {
                setLoading(false);
            }
        };

        checkToken();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    return (
        <>
            {loading ? <progress /> : <DashboardContent />}
        </>
    );
}
