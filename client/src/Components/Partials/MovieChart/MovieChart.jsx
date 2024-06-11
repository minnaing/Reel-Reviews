import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "./movie-chart.css";

export const data = [
  ["Ages", "percentage"],
  ["Baby Boomers +", 19],
  ["Gen X", 17],
  ["Millennials", 26],
  ["Gen Z", 17],
  ["Gen Alpha", 21],
];

export const options = {
  title: "AGE GROUP OF REVIEWS",
  is3D: true,
};

const movieFacts = [
  "Adjusted for inflation, 'Pirates of the Caribbean: On Stranger Tides' (2011) holds the record for the most expensive film ever made, costing over $379 million.",
  "'The Adventures of Prince Achmed,' made by Lotte Reiniger and released in Germany in 1926, is the world’s first feature-length animated film.",
  "The animated movie 'The Thief and the Cobbler' holds the record for a film in production the longest. Production began in 1964 and was not completed until 1993, taking a total of 29 years.",
  "'Avatar' (2009), directed by James Cameron, holds the record for the highest-grossing film of all time, earning over $2.8 billion worldwide.",
  "Three films share the record for the most Academy Awards: 'Ben-Hur' (1959), 'Titanic' (1997), and 'The Lord of the Rings: The Return of the King' (2003), each winning 11 Oscars.",
  "The original Godzilla film has spawned over 30 sequels since its debut in 1954, making it the cinematic franchise with the most sequels.",
  "The oldest surviving feature film is the Australian production 'The Story of the Kelly Gang' (1906), which runs a little over an hour long.",
];

// Chart component as a functional component
const MovieChart = () => {
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * movieFacts.length);
    setRandomFact(movieFacts[randomIndex]);
  }, []);

  useEffect(() => {
    const adjustSVG = () => {
      const svg = document.querySelector("svg");
      if (svg) {
        const rects = svg.querySelectorAll("rect");
        rects.forEach(rect => {
          if (
            rect.getAttribute("x") === "143" &&
            rect.getAttribute("y") === "71" &&
            rect.getAttribute("width") === "100" &&
            rect.getAttribute("height") === "100"
          ) {
            rect.setAttribute("x", "200");
            rect.setAttribute("y", "100");
            rect.setAttribute("width", "150");
            rect.setAttribute("height", "150");
            rect.setAttribute("fill-opacity", "0.5");
            rect.setAttribute("fill", "rgb(0, 0, 0)");
          }
        });
      }
    };

    // Call adjustSVG on component mount and when window resizes
    adjustSVG();
    window.addEventListener("resize", adjustSVG);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", adjustSVG);
  }, []);

  return (
    <div id="chart">
      <div id="chart-aside-0" className="rainbow-box">
        <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"500px"} />
      </div>

      <div id="chart-aside-1" className="rainbow-box">
        <h1> REEL REVIEWS </h1>
        <aside>
          <h3>
            Children (Under 11): <span style={{ color: "#fd1892" }}>Gen Alpha</span>
          </h3>
          <p>
            For children, the app would likely focus on movies rated G or PG, emphasizing themes of adventure, fantasy,
            and family-friendly content. The selections would avoid complex or mature themes, aligning with what is
            generally considered appropriate and enjoyable for this age group.
          </p>
          <h3>
            Teenagers (12 - 29): <span style={{ color: "#2c90fc" }}>Gen Z</span>{" "}
          </h3>
          <p>
            Teenagers often seek movies that resonate with their experiences or aspirations, including genres like young
            adult fiction, comedies, and action-packed adventures. The app can curate movies that tackle coming-of-age
            themes, first loves, or the challenges of growing up, which are particularly appealing to this demographic.
          </p>
          <h3>
            Young Adults (30 - 44); <span style={{ color: "#b8fd33" }}>Millennials</span>{" "}
          </h3>
          <p>
            Young adults might appreciate a wider range of movies, including those that address more mature and complex
            themes. This age group might be drawn to genres like psychological thrillers, romantic comedies, indie
            films, and dramas that reflect their own life experiences or societal issues they care about.
          </p>
          <h3>
            Adults (45 - 59): <span style={{ color: "#fec837" }}>Gen X</span>{" "}
          </h3>
          <p>
            Adults may have more eclectic tastes, ranging from critically acclaimed dramas and documentaries to action
            and suspense. They might also appreciate films that delve into familial dynamics, career challenges, and
            personal growth, reflecting the broader range of life stages and experiences typical of this age group.
          </p>
          <h3>
            Seniors (60+): 
            <span style={{ color: "#b827fc" }}> Baby Boomers,</span>{" "}
            <span style={{ color: "#fca347" }}> Silent Generation,</span>{" "}
            <span style={{ color: "#29fc92" }}> Greatest Generation</span>{" "}
          </h3>
          <p>
            Seniors might enjoy movies that offer nostalgia, historical perspectives, or thoughtful reflections on life
            and relationships. Films that feature characters in similar life stages or that revisit eras from their
            youth can be particularly appealing, offering both entertainment and a connection to their own lives and
            memories.
          </p>
        </aside>
      </div>

      <div id="chart-aside-2" className="rainbow-box">
        <h2 id="aside-note"> A SIDE NOTE: </h2>
        <aside>
          <h3>Fun Facts</h3>
          <p>{randomFact}</p>
        </aside>
      </div>
    </div>
  );
};

export default MovieChart;
