import React, { useEffect, useState } from "react";
import axios from "axios";

function CourseList(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:5001/api/courses", {
          withCredentials: true,
        });
        console.log(data.data.course);
        setData(data.data.course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {data &&
        data.map((course, id) => (
          <div className="card bg-base-100 w-96 shadow-sm" key={id}>
            <figure>
              <img src={course.image} alt="course image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <p>{course.detail}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CourseList;
