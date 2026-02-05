"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiFileText,
  FiTruck,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiUploadCloud,
  FiCamera,
} from "react-icons/fi";

const DriverOnboarding = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Progress Bar Width
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Step Indicator Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
                Step 0{step}
              </p>
              <h1 className="text-2xl font-black text-slate-900">
                {step === 1 && "Personal Information"}
                {step === 2 && "Verification Documents"}
                {step === 3 && "Vehicle & Guarantor"}
                {step === 4 && "Review & Submit"}
              </h1>
            </div>
            <span className="text-slate-400 text-sm font-bold">
              {step}/{totalSteps}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-100/50 border border-white relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: PERSONAL INFO */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        placeholder="First & Last Name"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-center py-6 border-2 border-dashed border-slate-100 rounded-[2rem] hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform">
                      <FiCamera size={20} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      Upload Profile Photo
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase">
                      Clear selfie, no sunglasses
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: DOCS (NIN / LICENSE) */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                    <FiFileText className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p className="text-xs text-blue-700 leading-relaxed font-medium">
                      Please ensure documents are clear and readable. We accept
                      JPG, PNG, or PDF (Max 5MB).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-3xl hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
                      <FiUploadCloud
                        className="text-slate-300 group-hover:text-blue-500 mb-2"
                        size={24}
                      />
                      <span className="text-sm font-bold text-slate-600">
                        Driver's License
                      </span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-3xl hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
                      <FiUploadCloud
                        className="text-slate-300 group-hover:text-blue-500 mb-2"
                        size={24}
                      />
                      <span className="text-sm font-bold text-slate-600">
                        NIN Slip/Card
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: VEHICLE & GUARANTOR */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Vehicle Make
                      </label>
                      <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none">
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Sienna</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">
                        Passenger Seats
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 7"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiUsers className="text-blue-600" />
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                        Guarantor Info
                      </h4>
                    </div>
                    <input
                      type="text"
                      placeholder="Guarantor Full Name"
                      className="w-full p-4 bg-white border border-slate-100 rounded-2xl outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Guarantor Phone Number"
                      className="w-full p-4 bg-white border border-slate-100 rounded-2xl outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW */}
              {step === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <FiCheckCircle size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Ready to Submit?
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                      By submitting, you agree to our Driver Code of Conduct and
                      background check policy.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Summary
                    </p>
                    <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Verification Status</span>
                      <span className="text-blue-600">Pending Review</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-slate-50">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-4 font-bold text-slate-400 hover:text-slate-900 transition-colors"
              >
                <FiArrowLeft /> Back
              </button>
            )}
            <button
              onClick={step === 4 ? () => console.log("Submitted") : nextStep}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all ml-auto"
            >
              {step === 4 ? "Submit Application" : "Continue"} <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Support Footer */}
        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          Need help with onboarding?{" "}
          <span className="text-blue-600 cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default DriverOnboarding;