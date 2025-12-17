import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useSecure from "../../../Hooks/useSecure/useSecure";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const EditScholarship = () => {
  const axiosSecure = useSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  // react form
  const { register, handleSubmit, reset } = useForm();
  // data fetching
  const { data: scholarship = [], isSuccess } = useQuery({
    queryKey: ["singleScholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });
  // store the scholarship value as a default on form data with reset method and avoid _id
  useEffect(() => {
    if (isSuccess && scholarship) {
      const { _id, ...rest } = scholarship;
      reset(rest);
    }
  }, [isSuccess, scholarship, reset]);
  // destracturing the scholarship data
  const {
    scholarshipName,
    universityName,
    image,
    country,
    city,
    worldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    deadline,
  } = scholarship;

  const handleEditScholarship = async (data) => {
    const res = await axiosSecure.put(`/scholarships/${id}`, data);

    if (res.data.success) {
      toast.success("Scholarship Updated Successfully!");
      navigate("/dashboard/manage-scholarship");
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
      <ToastContainer></ToastContainer>
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          Edit Scholarship
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill the form below to publish a new scholarship opportunity.
        </p>
      </header>

      {/* Main Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(handleEditScholarship)}>
          {/* Program Identification */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Scholarship Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={scholarshipName}
                  className="input input-bordered w-full shadow-sm"
                  {...register("scholarshipName")}
                />
              </div>

              {/* University Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    University Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={universityName}
                  className="input input-bordered w-full shadow-sm"
                  {...register("universityName")}
                />
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
                  defaultValue={image}
                  className="input input-bordered w-full shadow-sm"
                  {...register("image")}
                />
              </div>
            </div>
          </section>

          {/* Academic & Geographic Details */}
          <section className="mb-8 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Country
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={country}
                  className="input input-bordered w-full shadow-sm"
                  {...register("country")}
                />
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
                  defaultValue={city}
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
                  min="1"
                  defaultValue={worldRank}
                  className="input input-bordered w-full shadow-sm"
                  {...register("worldRank")}
                />
              </div>

              {/* Subject Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Subject Category
                  </span>
                </label>
                <select
                  defaultValue={subjectCategory}
                  className="select select-bordered w-full shadow-sm"
                  {...register("subjectCategory")}
                >
                  <option>STEM</option>
                  <option>General</option>
                  <option>Engineering</option>
                  <option>Arts</option>
                  <option>Business</option>
                  <option>Agriculture</option>
                  <option>Medical</option>
                  <option>Science</option>
                  <option>Journalism</option>
                  <option>Environment</option>
                  <option>Entrepreneurship</option>
                </select>
              </div>

              {/* Degree */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Degree Level
                  </span>
                </label>
                <select
                  defaultValue={degree}
                  className="select select-bordered w-full shadow-sm"
                  {...register("degree")}
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
                    Funding Type
                  </span>
                </label>
                <select
                  defaultValue={scholarshipCategory}
                  className="select select-bordered w-full shadow-sm"
                  {...register("scholarshipCategory")}
                >
                  <option>Full Funded</option>
                  <option>Partially Funded</option>
                  <option>Tuition Waiver</option>
                  <option>Research Grant</option>
                </select>
              </div>
            </div>
          </section>

          {/* Financial & Dates */}
          <section className="mb-10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Tuition Fees ($)
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={tuitionFees}
                  className="input input-bordered w-full shadow-sm"
                  {...register("tuitionFees")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Application Fees ($)
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={applicationFees}
                  className="input input-bordered w-full shadow-sm"
                  {...register("applicationFees")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Service Charge ($)
                  </span>
                </label>
                <input
                  type="number"
                  defaultValue={serviceCharge}
                  className="input input-bordered w-full shadow-sm"
                  {...register("serviceCharge")}
                />
              </div>

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

              <div className="form-control md:col-span-4">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Application Deadline
                  </span>
                </label>
                <input
                  type="date"
                  defaultValue={deadline}
                  className="input input-bordered w-full shadow-sm"
                  {...register("deadline")}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              type="submit"
              className="btn btn-md btn-primary text-white px-12 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 font-bold"
            >
              Edit Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScholarship;
