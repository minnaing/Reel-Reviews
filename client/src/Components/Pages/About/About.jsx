import { useState, useEffect } from "react";

import "./about.css";

// DEFINE API URL FOR FETCHING POPULAR MOVIES FROM THE MOVIE DATABASE API
const BASE_URL = "https://api.themoviedb.org/3";

// DEFINE API KEY URL FOR FETCHING MOVIES BASED ON A SEARCH QUERY FROM THE MOVIE DATABASE API
const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";

// BASE URL FOR IMAGES
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const About = () => {
  const [contentSections, setContentSections] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    // Simulate fetching content from an API or static content
    const fetchedContent = [
      {
        id: 1,
        title: "Abstract",
        text: "The Age Group Review App differentiates itself from generic movie review platforms by offering customized recommendations tailored to each user's age group. This feature is pivotal because it acknowledges that movie preferences vary widely among different ages. A review that resonates with a 60-year-old may not necessarily appeal to a millennial or a teenager. By segmenting reviews based on age and demographics, the app ensures that users receive movie suggestions and critiques that are more relevant and relatable to their experiences and interests. This personalization enhances the user's experience by connecting them with movies that align more closely with their individual tastes and cultural perspectives, a significant advancement over the one-size-fits-all approach of traditional movie review platforms.",
      },
      {
        id: 2,
        title: "Problem Statements",
        text: "This project confronts the significant challenge of delivering movie reviews and recommendations that genuinely resonate with various age groups' diverse tastes and preferences. Contemporary platforms like Rotten Tomatoes and Netflix predominantly offer generalized reviews, frequently failing to meet the specific needs and expectations of distinct age demographics. Also, movie streaming platforms sometimes require users to watch the movie to get recommendations based on what they like. This shortfall creates a market gap, particularly evident in the mismatch between what captivates older audiences instead of younger viewers. The project focuses on discerning and addressing the varied cinematic interests inherent across generations. This variation largely stems from differences in cultural exposure, technological evolution, and narrative tastes that change with each generation. Addressing this issue requires a nuanced understanding of these disparities to ensure that our recommendations and reviews are not only inclusive but also accurately reflective of the unique preferences of each age group, thereby bridging the gap in current movie review and recommendation platforms.",
        // Assuming text continues
      },
      {
        id: 3,
        title: "Goals and Objectives",
        text: "The primary objectives for our application are to create an intuitive interface that caters to users of different age groups, develop a sophisticated and detailed movie rating and review system tailored to varied age-specific preferences, and incorporate features that foster community engagement and interaction among users with similar cinematic interests. This approach is designed to resonate with a diverse audience, from millennials to older generations, ensuring that each user group finds content and recommendations that align with their unique tastes and cultural perspectives.",
        // Assuming text continues
      },
    ];

    setContentSections(fetchedContent);
    fetchNewReleases();
  }, []);

  const fetchNewReleases = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      if (!response.ok) throw new Error("Response not ok");
      const data = await response.json();
      let movies = data.results.map((movie) => ({
        id: movie.id,
        name: movie.title,
        year: movie.release_date.split("-")[0],

        // This is a genre ID, you might need to map it to genre names,
        genre: movie.genre_ids[0],
        posterPath: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      }));

      // Select 5 random movies if the list is larger than 5
      if (movies.length > 3) {
        movies = movies.sort(() => 0.3 - Math.random()).slice(0, 3);
      }

      setNewReleases(movies);
    } catch (error) {
      console.error("Failed to fetch new releases:", error);
    }
  };

  return (
    <div className="aboutUsWrapper">
      <h2 style={{ textAlign: "center" }}>About Us</h2>

      {contentSections.map((section) => (
        <div key={section.id} className="contentSection">
          <h4>{section.title}</h4>
          <p>{section.text}</p>
        </div>
      ))}

      <div className="newReleasesSection">
        <h2 id="newReleasesSection">New Releases</h2>
        <div className="moviesDisplay">
          {newReleases.map((movie) => (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.name)}`}
              key={movie.id}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="movieCard">
                <h3>{movie.name}</h3>
                <p>Year Released: {movie.year}</p>
                {movie.posterPath && (
                  <img 
                    src={movie.posterPath} 
                    alt={movie.name} 
                    style={{ width: "100%", height: "auto" }} />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
