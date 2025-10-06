import React, { useState } from "react";

const SkillsList = ({ skills }) => {
  const [showAll, setShowAll] = useState(false);

  if (!skills || skills.length === 0) return null;

  const displayedSkills = showAll ? skills : skills.slice(0, 4);
  const remainingCount = skills.length - 4;

  return (
    <div className="flex flex-wrap gap-2 mb-1 relative z-10">
      {displayedSkills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs font-medium rounded-full 
             bg-gradient-to-r from-indigo-500 to-purple-600 
             text-white shadow-md hover:shadow-[0_0_15px_rgba(138,43,226,0.8)] 
             hover:scale-110 hover:rotate-2 transition-all duration-500"
        >
          🚀 {skill}
        </span>
      ))}

      {!showAll && remainingCount > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700/70 text-white shadow-md hover:bg-gray-800 transition"
        >
          +{remainingCount} more
        </button>
      )}

      {showAll && skills.length > 4 && (
        <button
          onClick={() => setShowAll(false)}
          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700/70 text-white shadow-md hover:bg-gray-800 transition"
        >
          Collapse
        </button>
      )}
    </div>
  );
};

export default SkillsList;
