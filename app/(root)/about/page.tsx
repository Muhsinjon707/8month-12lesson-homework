"use client";

import { useCollection } from "@/app/hooks/useCollection";

const About = () => {
  const {data: userData} = useCollection("favorites");

  return (
    <div className="mt-20 min-h-screen">
      <h2>About page</h2>

      <div>
        {userData.length > 0 &&
          userData.map((data) => {
            return (
              <div key={data.id}>
                <h3>Title: {data.title}</h3>
                <p>Text: {data.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default About;
