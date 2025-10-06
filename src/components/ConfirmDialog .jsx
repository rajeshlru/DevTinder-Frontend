const ConfirmDialog = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center animate-scaleIn">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ⚠️ Delete Account?
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete your account? <br />
          This action <span className="text-red-600 font-semibold">
            cannot
          </span>{" "}
          be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-700 hover:text-white transition shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="relative px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 
             shadow-lg shadow-red-500/30 
             hover:scale-105 hover:shadow-red-600/50 
             active:scale-95 
             transition-all duration-300 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-400/40 to-red-700/40 opacity-0 group-hover:opacity-100 blur-xl transition duration-300"></span>

            <span className="relative z-10 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 
        0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                />
              </svg>
              Yes, Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
