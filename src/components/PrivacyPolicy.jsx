import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              What We Collect
            </h2>
            <p className="text-slate-700">
              Basic profile info, technical skills, project details.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              How We Use It
            </h2>
            <p className="text-slate-700">
              To match developers, improve our service, communicate with you.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Data Sharing
            </h2>
            <p className="text-slate-700">
              We don't sell your data. Only share with your matches.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Your Rights
            </h2>
            <p className="text-slate-700">
              You can delete your account and data anytime.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Security
            </h2>
            <p className="text-slate-700">
              We protect your data with industry standards.
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

export default PrivacyPolicy;
