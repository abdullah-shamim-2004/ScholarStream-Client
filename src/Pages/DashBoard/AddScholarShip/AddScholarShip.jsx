import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";
import Swal from "sweetalert2";

const AddScholarShip = () => {
  const { user } = useAuth();
  const axiosSecure = useSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //  default values
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
      postDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data) => {
    try {
      const submissionData = {
        ...data,
        worldRank: Number(data.worldRank),
        tuitionFees: Number(data.tuitionFees),
        applicationFees: Number(data.applicationFees),
        serviceCharge: Number(data.serviceCharge),
        email: user?.email,
      };

      await axiosSecure.post("/scholarships", submissionData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error("Error creating scholarship:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          Add New Scholarship
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill the form below to publish a new scholarship opportunity.
        </p>
      </header>

      {/* Main Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 max-w-4xl mx-auto">
        {/* Form is wrapped with handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*  Program Identification & Logistics */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Scholarship Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Global STEM Excellence Scholarship"
                  className={`input input-bordered w-full shadow-sm ${
                    errors.scholarshipName ? "input-error" : ""
                  }`}
                  // Register the field, including validation rules
                  {...register("scholarshipName", {
                    required: "Scholarship name is required",
                  })}
                />
                {errors.scholarshipName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.scholarshipName.message}
                  </p>
                )}
              </div>

              {/* University Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    University Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., MIT, Oxford"
                  className={`input input-bordered w-full shadow-sm ${
                    errors.universityName ? "input-error" : ""
                  }`}
                  {...register("universityName", {
                    required: "University name is required",
                  })}
                />
                {errors.universityName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.universityName.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Image URL
                  </span>
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

          {/*  Academic & Geographic Details */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., USA"
                  className={`input input-bordered w-full shadow-sm ${
                    errors.country ? "input-error" : ""
                  }`}
                  {...register("country", { required: "Country is required" })}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    City
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    World Rank
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1"
                  min="1"
                  className={`input input-bordered w-full shadow-sm ${
                    errors.worldRank ? "input-error" : ""
                  }`}
                  {...register("worldRank", {
                    min: { value: 1, message: "Rank must be 1 or higher" },
                  })}
                />
                {errors.worldRank && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.worldRank.message}
                  </p>
                )}
              </div>

              {/* Subject Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Subject Category <span className="text-red-500">*</span>
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Degree Level <span className="text-red-500">*</span>
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Funding Type <span className="text-red-500">*</span>
                  </span>
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

          {/*  Financials and Dates */}
          <section className="mb-10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Tuition Fees */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Tuition Fees ($)
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Application Fees ($)
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Service Charge ($)
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Post Date
                  </span>
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
                  <span className="label-text font-semibold text-gray-700">
                    Application Deadline <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full shadow-sm ${
                    errors.deadline ? "input-error" : ""
                  }`}
                  {...register("deadline", {
                    required: "Deadline is required",
                    // Simple future date validation (can be more robust)
                    validate: (value) =>
                      new Date(value) > new Date() ||
                      "Deadline must be in the future",
                  })}
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              type="submit"
              className="btn btn-md btn-primary text-white px-12 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 font-bold"
            >
              Create Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarShip;
