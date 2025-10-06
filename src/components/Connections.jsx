import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import LoadingState from "./LoadingState";

import ConnectionCard from "./ConnectionCard";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import GlobalStyle from "./GlobalStyle";

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/5 to-transparent animate-pulse blur-3xl" />
    {[...Array(80)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${2 + Math.random() * 4}s`,
          opacity: Math.random(),
        }}
      />
    ))}
  </div>
);

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("Fetched connections:", res.data);
      dispatch(addConnection(res.data.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Failed to load connections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState fetchConnections={fetchConnections} />;
  }

  if (!connections || connections.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      <AnimatedBackground />
      <GlobalStyle />
      <ConnectionCard connections={connections} />
    </div>
  );
};

export default Connections;
