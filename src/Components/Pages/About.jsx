import React, { useState, useEffect } from "react";
import "./pages.css"; // Assuming a similar CSS file for basic styling

const AboutUs = () => {
  const [contentSections, setContentSections] = useState([]);

  useEffect(() => {
    // Simulate fetching content from an API or static content
    const fetchedContent = [
      {
        id: 1,
        title: "Abstract",
        text: "The Age Group Review App differentiates itself from generic movie review platforms by offering customized recommendations tailored to each user's age group. This feature is pivotal because it acknowledges that movie preferences vary widely among different ages. A review that resonates with a 60-year-old may not necessarily appeal to a millennial or a teenager. By segmenting reviews based on age and demographics, the app ensures that users receive movie suggestions and critiques that are more relevant and relatable to their experiences and interests. This personalization enhances the user's experience by connecting them with movies that align more closely with their individual tastes and cultural perspectives, a significant advancement over the one-size-fits-all approach of traditional movie review platforms."
      },
      {
        id: 2,
        title: "Problem Statements",
        text: "This project confronts the significant challenge of delivering movie reviews and recommendations that genuinely resonate with various age groups' diverse tastes and preferences. Contemporary platforms like Rotten Tomatoes and Netflix predominantly offer generalized reviews, frequently failing to meet the specific needs and expectations of distinct age demographics. Also, movie streaming platforms sometimes require users to watch the movie to get recommendations based on what they like. This shortfall creates a market gap, particularly evident in the mismatch between what captivates older audiences instead of younger viewers. The project focuses on discerning and addressing the varied cinematic interests inherent across generations. This variation largely stems from differences in cultural exposure, technological evolution, and narrative tastes that change with each generation. Addressing this issue requires a nuanced understanding of these disparities to ensure that our recommendations and reviews are not only inclusive but also accurately reflective of the unique preferences of each age group, thereby bridging the gap in current movie review and recommendation platforms."
        // Assuming text continues
      },
      {
        id: 3,
        title: "Goals and Objectives",
        text: "The primary objectives for our application are to create an intuitive interface that caters to users of different age groups, develop a sophisticated and detailed movie rating and review system tailored to varied age-specific preferences, and incorporate features that foster community engagement and interaction among users with similar cinematic interests. This approach is designed to resonate with a diverse audience, from millennials to older generations, ensuring that each user group finds content and recommendations that align with their unique tastes and cultural perspectives."
        // Assuming text continues
      }
      
    ];

    setContentSections(fetchedContent);
  }, []);

  return (
    <div className="aboutUsWrapper">
      <h2 style={{ textAlign: "center" }}>About Us</h2>
      {contentSections.map((section) => (
        <div key={section.id} className="contentSection">
          <h4>{section.title}</h4>
          <p>{section.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;




