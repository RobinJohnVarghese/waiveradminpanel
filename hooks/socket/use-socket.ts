import { useEffect, useRef, useState } from "react";

interface User {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
}


const useWebSocket = (auth: any) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [center, setCenter] = useState<any>({ lat: 10.8505, lng: 76.2711 });

    useEffect(() => {
        if (!auth?.accessToken) return;

        if (socketRef.current) {
            socketRef.current.close();
        }

        const wsUrl = `wss://api.waiverapp.in/ws/live-location/?token=${auth.accessToken}`;
        console.log("🔗 Attempting WebSocket connection to:", wsUrl);

        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket connected successfully!");
        };

        socketRef.current.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
        };

        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📩 Message received:", data);
                setUserData(data)

            } catch (error) {
                console.error("❌ Error parsing WebSocket message:", error);
            }
        };

        socketRef.current.onclose = (event) => {
            console.warn("⚠️ WebSocket closed:", {
                reason: event.reason,
                wasClean: event.wasClean,
                code: event.code,
            });
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [auth?.accessToken]);

    const setUserData = (data: any) => {
        if (data) {
            const { current_loc_lat, current_loc_long, user_id, is_online } = data;

            if (!is_online) {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== user_id)
                );
                return;
            }

            setUsers((prevUsers) => [
                ...prevUsers.filter((user) => user.id !== user_id),
                {
                    id: user_id,
                    name: data.username || "User",
                    user_type: data.user_type,
                    user_phone: data.user_phone ,
                    is_online: true,
                    location: {
                        lat: current_loc_lat,
                        lng: current_loc_long,
                    },
                },
            ]);

            setCenter({
                lat: current_loc_lat,
                lng: current_loc_long,
            });
        }
    };

    return { socket: socketRef.current, users, center };
};

export default useWebSocket;
