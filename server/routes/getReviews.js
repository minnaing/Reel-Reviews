import { scrapeReddit } from '../utils/scrapeReddit.js';
import { autoScroll } from '../utils/autoScroll.js';

export const getReviews = async (req, res) => {
  console.log(req.body);  // Log the body to debug it
  res.json({ message: "Data received", data: req.body }); // Echo back the received data for debugging

  // const { movieName, releaseDate } = req.body;
  // try {
  //     const comments = await scrapeReddit(movieName, releaseDate);
  //     res.json({ comments });
  // } catch (error) {
  //     res.status(500).send("An error occurred while fetching reviews.");
  // }
};
