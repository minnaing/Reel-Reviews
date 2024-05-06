// import React from 'react';

// function MovieReviewForm() {
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const movieName = form.elements.movieName.value;
//         const releaseDate = form.elements.releaseDate.value;

//         // Implement fetch request to POST data
//         const response = await fetch('/get-reviews', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ movieName, releaseDate })
//         });

//         if (response.ok) {
//             console.log("Reviews submitted successfully.");
//             // Handle response
//         } else {
//             console.error("Failed to submit reviews.");
//         }
//     };

//     return (
//         <div>
//             <h1>Movie Review Scraper</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="movieName">Movie Name:</label>
//                     <input type="text" id="movieName" name="movieName" required />
//                 </div>
//                 <div>
//                     <label htmlFor="releaseDate">Release Date:</label>
//                     <input type="text" id="releaseDate" name="releaseDate" required />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default MovieReviewForm;
