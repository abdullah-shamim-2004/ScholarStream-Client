import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useSecure from "../../../Hooks/useSecure/useSecure";
import Swal from "sweetalert2";
import { MdSchool } from "react-icons/md";

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
    <div className="container mx-auto p-4 md:p-10 bg-base-200/50 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-10">
        <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
          <MdSchool className="text-primary text-4xl" />
        </div>
        <h1 className="text-4xl font-black text-base-content tracking-tight mb-2">
          Add New <span className="text-primary">Scholarship</span>
        </h1>
        <p className="text-base-content/60 font-medium">
          Publish a new scholarship opportunity for global students.
        </p>
      </header>

      {/* Main Form Card */}
      <div className="bg-base-100 shadow-2xl rounded-[2.5rem] p-6 md:p-12 border border-base-300 max-w-5xl mx-auto relative overflow-hidden">
        {/* Decorative blur element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
          {/* --- Section 1: Identification --- */}
          <section className="mb-10 group">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                1
              </span>
              <h2 className="text-xl font-bold text-base-content uppercase tracking-wider">
                Program Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              {/* Scholarship Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Scholarship Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Global STEM Excellence"
                  className={`input input-bordered bg-base-200/50 focus:border-primary rounded-xl h-12 ${
                    errors.scholarshipName ? "input-error" : ""
                  }`}
                  {...register("scholarshipName", {
                    required: "Scholarship name is required",
                  })}
                />
              </div>

              {/* University Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    University Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Harvard University"
                  className={`input input-bordered bg-base-200/50 focus:border-primary rounded-xl h-12 ${
                    errors.universityName ? "input-error" : ""
                  }`}
                  {...register("universityName", {
                    required: "University name is required",
                  })}
                />
              </div>

              {/* Image URL */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold text-base-content/70">
                    Thumbnail URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://image-link.com"
                  className="input input-bordered bg-base-200/50 focus:border-primary rounded-xl h-12"
                  {...register("image")}
                />
              </div>
            </div>
          </section>

          {/* --- Section 2: Academic & Geographic --- */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center font-bold">
                2
              </span>
              <h2 className="text-xl font-bold text-base-content uppercase tracking-wider">
                Eligibility & Location
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
              {/* Country */}
              <div className="form-control">
                <label className="label text-xs font-bold text-base-content/50 uppercase">
                  Country
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-base-200/50 rounded-xl"
                  {...register("country", { required: true })}
                />
              </div>

              {/* Subject Category */}
              <div className="form-control">
                <label className="label text-xs font-bold text-base-content/50 uppercase">
                  Category
                </label>
                <select
                  className="select select-bordered bg-base-200/50 rounded-xl"
                  {...register("subjectCategory", { required: true })}
                >
                  <option>STEM</option>
                  <option>Arts & Humanities</option>
                  <option>Business & Law</option>
                </select>
              </div>

              {/* Degree Level */}
              <div className="form-control">
                <label className="label text-xs font-bold text-base-content/50 uppercase">
                  Degree
                </label>
                <select
                  className="select select-bordered bg-base-200/50 rounded-xl"
                  {...register("degree", { required: true })}
                >
                  <option>Undergraduate</option>
                  <option>Master's</option>
                  <option>PhD</option>
                </select>
              </div>
            </div>
          </section>

          {/* --- Section 3: Financials --- */}
          <section className="mb-10 bg-base-200/30 p-6 rounded-[2rem] border border-base-300/50">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold">
                $
              </span>
              <h2 className="text-xl font-bold text-base-content uppercase tracking-wider">
                Financial Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label text-xs font-black opacity-50 uppercase">
                  Application Fee
                </label>
                <input
                  type="number"
                  className="input input-bordered bg-base-100 rounded-xl"
                  {...register("applicationFees")}
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-black opacity-50 uppercase">
                  Service Charge
                </label>
                <input
                  type="number"
                  className="input input-bordered bg-base-100 rounded-xl"
                  {...register("serviceCharge")}
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-black opacity-50 uppercase">
                  Deadline
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-base-100 rounded-xl"
                  {...register("deadline", { required: true })}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <button
              type="submit"
              className="btn btn-primary btn-wide rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              Publish Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarShip;
