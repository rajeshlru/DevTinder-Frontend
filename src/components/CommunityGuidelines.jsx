import React from "react";
import { Link } from "react-router-dom";

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Community Guidelines
          </h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Be Respectful
            </h2>
            <p className="text-slate-700">
              Treat everyone with respect. No harassment, discrimination, or
              hate speech.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Keep it Professional
            </h2>
            <p className="text-slate-700">
              Share relevant content. No spam or self-promotion.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Protect Privacy
            </h2>
            <p className="text-slate-700">
              Don't share personal information. Respect others' privacy.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Be Honest
            </h2>
            <p className="text-slate-700">
              Use real information in your profile. No fake accounts.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Help Each Other
            </h2>
            <p className="text-slate-700">
              Share knowledge. Give constructive feedback.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
