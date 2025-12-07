import React from 'react';
import { useForm } from "react-hook-form";

// Define the shape of the form data for TypeScript/IntelliSense (Optional but recommended)
// type FormData = {
//   scholarshipName: string;
//   universityName: string;
//   image: string;
//   country: string;
//   city: string;
//   worldRank: number;
//   subjectCategory: string;
//   scholarshipCategory: string;
//   degree: string;
//   tuitionFees: number;
//   applicationFees: number;
//   serviceCharge: number;
//   deadline: string;
//   postDate: string;
// };

const AddScholarShip = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    // Set default values based on the example structure
    defaultValues: {
      scholarshipName: "",
      universityName: "",
      image: "",
      country: "",
      city: "",
      worldRank: 1,
      subjectCategory: "STEM",
      scholarshipCategory: "Full Funded",
      degree: "Undergraduate",
      tuitionFees: 0,
      applicationFees: 0,
      serviceCharge: 0,
      deadline: "",
      postDate: new Date().toISOString().split('T')[0],
    }
  });

  // Function executed upon successful validation and submission
  const onSubmit = (data) => {
    // Ensure numeric fields are correctly parsed, though register usually handles it
    const submissionData = {
      ...data,
      worldRank: Number(data.worldRank),
      tuitionFees: Number(data.tuitionFees),
      applicationFees: Number(data.applicationFees),
      serviceCharge: Number(data.serviceCharge),
    };

    console.log('New Scholarship Data Submitted:', submissionData);
    alert('Scholarship data submitted successfully! Check console for details.');
    // Add API call logic here (e.g., axios.post('/api/scholarships', submissionData))
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 drop-shadow-md">
          Scholarship Creator Portal
        </h1>
        <p className="text-lg text-gray-600">
          Enter the comprehensive details to list a new global scholarship opportunity.
        </p>
      </header>

      {/* Main Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 max-w-4xl mx-auto">
        
        {/* Form is wrapped with handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Group 1: Program Identification & Logistics */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-green-500 mr-2">⭐</span> Scholarship Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Scholarship Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Scholarship Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Global STEM Excellence Scholarship"
                  className={`input input-bordered w-full shadow-sm ${errors.scholarshipName ? 'input-error' : ''}`}
                  // Register the field, including validation rules
                  {...register("scholarshipName", { required: "Scholarship name is required" })}
                />
                {errors.scholarshipName && <p className="text-red-500 text-sm mt-1">{errors.scholarshipName.message}</p>}
              </div>

              {/* University Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">University Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., MIT, Oxford"
                  className={`input input-bordered w-full shadow-sm ${errors.universityName ? 'input-error' : ''}`}
                  {...register("universityName", { required: "University name is required" })}
                />
                {errors.universityName && <p className="text-red-500 text-sm mt-1">{errors.universityName.message}</p>}
              </div>

              {/* Image URL */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Image URL (Banner/Logo)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://i.ibb.co.com/scholarship-banner.png"
                  className="input input-bordered w-full shadow-sm"
                  {...register("image")}
                />
              </div>
            </div>
          </section>

          {/* Group 2: Academic & Geographic Details */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">🌍</span> Location & Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Country <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., USA"
                  className={`input input-bordered w-full shadow-sm ${errors.country ? 'input-error' : ''}`}
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>

              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">City</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cambridge"
                  className="input input-bordered w-full shadow-sm"
                  {...register("city")}
                />
              </div>

              {/* World Rank */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">World Rank (QS/THE)</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1"
                  min="1"
                  className={`input input-bordered w-full shadow-sm ${errors.worldRank ? 'input-error' : ''}`}
                  {...register("worldRank", { min: { value: 1, message: "Rank must be 1 or higher" } })}
                />
                {errors.worldRank && <p className="text-red-500 text-sm mt-1">{errors.worldRank.message}</p>}
              </div>
              
              {/* Subject Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Subject Category <span className="text-red-500">*</span></span>
                </label>
                <select
                  className="select select-bordered w-full shadow-sm"
                  {...register("subjectCategory", { required: true })}
                >
                  <option>STEM</option>
                  <option>Arts & Humanities</option>
                  <option>Social Sciences</option>
                  <option>Business & Law</option>
                </select>
              </div>

              {/* Degree */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Degree Level <span className="text-red-500">*</span></span>
                </label>
                <select
                  className="select select-bordered w-full shadow-sm"
                  {...register("degree", { required: true })}
                >
                  <option>Undergraduate</option>
                  <option>Graduate (Master's)</option>
                  <option>Post-Doctoral (PhD)</option>
                  <option>High School</option>
                </select>
              </div>

              {/* Scholarship Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Funding Type <span className="text-red-500">*</span></span>
                </label>
                <select
                  className="select select-bordered w-full shadow-sm"
                  {...register("scholarshipCategory", { required: true })}
                >
                  <option>Full Funded</option>
                  <option>Partially Funded</option>
                  <option>Tuition Waiver</option>
                  <option>Research Grant</option>
                </select>
              </div>

            </div>
          </section>

          {/* Group 3: Financials and Dates */}
          <section className="mb-10 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-yellow-600 mr-2">💲</span> Fees & Deadlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* Tuition Fees */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Tuition Fees ($)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full shadow-sm"
                  {...register("tuitionFees", { min: 0 })}
                />
              </div>

              {/* Application Fees */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Application Fees ($)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full shadow-sm"
                  {...register("applicationFees", { min: 0 })}
                />
              </div>

              {/* Service Charge */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Service Charge ($)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full shadow-sm"
                  {...register("serviceCharge", { min: 0 })}
                />
              </div>

              {/* Post Date (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Post Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full shadow-sm bg-gray-100"
                  readOnly
                  {...register("postDate")}
                />
              </div>

              {/* Deadline */}
              <div className="form-control md:col-span-4">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Application Deadline <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full shadow-sm ${errors.deadline ? 'input-error' : ''}`}
                  {...register("deadline", { 
                    required: "Deadline is required",
                    // Simple future date validation (can be more robust)
                    validate: (value) => new Date(value) > new Date() || "Deadline must be in the future"
                  })}
                />
                {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
              </div>

            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button type="submit" className="btn btn-lg btn-success text-white px-12 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create Scholarship Listing
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddScholarShip;