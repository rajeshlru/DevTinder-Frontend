import React, { useState, useRef } from "react";
import UserCard from "./Usercard";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const SwipeableUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const cardRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [highlight, setHighlight] = useState("");

  const handleDragStart = (e) => setDragging(true);

  const handleDrag = (e) => {
    if (!dragging) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!cardRef.current.startX) cardRef.current.startX = x;
    if (!cardRef.current.startY) cardRef.current.startY = y;

    const deltaX = x - cardRef.current.startX;
    const deltaY = y - cardRef.current.startY;

    setTranslate({ x: deltaX, y: deltaY });
    setRotation(deltaX / 20);

    if (deltaX > 50) setHighlight("interested");
    else if (deltaX < -50) setHighlight("ignored");
    else setHighlight("");
  };

  const handleDragEnd = () => {
    setDragging(false);
    const threshold = 100;

    if (translate.x > threshold) {
      setTranslate({ x: window.innerWidth, y: translate.y });
      sendRequest("interested");
    } else if (translate.x < -threshold) {
      setTranslate({ x: -window.innerWidth, y: translate.y });
      sendRequest("ignored");
    } else {
      setTranslate({ x: 0, y: 0 });
      setRotation(0);
      setHighlight("");
    }

    cardRef.current.startX = null;
    cardRef.current.startY = null;
  };

  const sendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(user._id));
    } catch (err) {
      console.error("Swipe API error:", err);
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-grab touch-pan-y transition: transform 0.3s ease, top 0.3s ease;"
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotation}deg)`,
        transition: dragging ? "none" : "transform 0.3s ease",
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
    >
      <UserCard user={user} highlight={highlight} />
    </div>
  );
};

export default SwipeableUserCard;
