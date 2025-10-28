import React, { useState } from "react";
import EditCourse from "./EditCourse";
import { useNavigate } from "react-router-dom";

function CourseList({ data, handleDelete }) {
  const navigate = useNavigate();
  console.log(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="flex flex-col items-center px-4  pb-24 ">
      {data && data.length > 0 ? (
        data.map((course, id) => (
          <div
            className="card bg-[#141d2b] w-full max-w-md shadow-lg mb-4 pt-4! rounded-2xl overflow-hidden  hover:shadow-2xl transition-shadow"
            key={id}
            onClick={() => navigate(`/courses/${course._id}/modules`)}
          >
            <div className="h-12 flex w-full gap-6  justify-between mb-1">
              <svg
                data-slot="icon"
                fill="none"
                className="size-7 text-white cursor-pointer"
                stroke-width="1.5"
                stroke="currentColor"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(course);
                  setIsModalOpen(true);
                }}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                className="size-7 text-rose-300 cursor-pointer "
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(course._id, course.title);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                ></path>
              </svg>
            </div>

            <figure className="relative">
              <img
                src={course.image}
                alt={course.title || "course image"}
                className="w-full h-48 object-cover"
              />

              {/* Category badges */}
              <div className="absolute top-3 left-3 right-3 flex gap-2 justify-between">
                <div className="rounded-full text-xs px-3 py-1 backdrop-blur-md bg-black/30 border border-white/20">
                  <span className="text-white font-medium">{course.type}</span>
                </div>
                <div className="rounded-full text-xs px-3 py-1 backdrop-blur-md bg-black/30 border border-white/20">
                  <span className="text-white font-medium">
                    {course.complexity}
                  </span>
                </div>
              </div>

              {/* Hours badge */}
              <div className="absolute bottom-3 right-3 rounded-lg text-xs px-3 py-1.5 backdrop-blur-md bg-blue-600/80 border border-blue-400/30">
                <span className="text-white font-semibold">
                  {course.hours} Hours
                </span>
              </div>
            </figure>

            <div className="card-body p-6">
              <h2 className="card-title text-white text-xl font-semibold">
                {course.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">
                {course.detail}
              </p>

              {/* Tags */}
              {course.tag && course.tag.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.tag.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2.5 py-1 bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Course Stats */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{course.hours}h</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>{course.modules?.length || 0} Modules</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{course.complexity}</span>
                </div>
              </div>

              {/* Action Button */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 text-gray-600"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <p className="text-lg font-medium">No courses available yet.</p>
          <p className="text-sm mt-2">Click the + button to add a course.</p>
        </div>
      )}
      {/* ✅ Modal rendered only once */}
      {isModalOpen && selectedCourse && (
        <EditCourse
          isOpen={isModalOpen}
          course={selectedCourse}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default CourseList;
