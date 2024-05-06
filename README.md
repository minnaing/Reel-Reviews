# [Reel-Reviews](https://reelreviews.info/)

## Description

The Movie Search App is a web application designed to help users search for movies by their titles. What sets this app apart is its ability to categorize and rate movies based on genre and age group. Users can enter the name of a movie they are interested in, and the app will fetch and display a list of matching movie titles from a movie database. Additionally, it categorizes these movies into genres and age ratings, providing a comprehensive movie search experience.

This integration will filter movies based on their release years corresponding to the generational age brackets you've provided. This approach assumes a simplistic correlation between a user's age (and thus generation) and the movies' release years that might appeal to them.

## Technology Stack

- React for the front-end
- Node.js for the back-end
- Bootstrap for styling
- The Movie Database (TMDb) API for movie data

## Team Members

- Terrell D. Lemons (Developer Role)
  - Email: `LemonsTerrell@csu.fullerton.edu`

- Leung Wang Chan (Developer Role)
  - Email: `lchan2021@csu.fullerton.edu`

- James D Owens (Developer Role)
  - Email: `jamesowens@csu.fullerton.edu`

- Julian V Apparicio (Developer Role)
  - Email: `Jvapparicio@csu.fullerton.edu`

## Navigation

### Home Page
Access the Home Page by clicking the "Home" tab in the navigation bar. Here, you can:
  - **Search for any movie trailers** using the search bar.
  - **View charts of generational movie gaps** showing trends in movie preferences across different ages.
  - **Explore the most popular movies currently in theaters or trending online.**

### Review Page
Access the Review Page by selecting the "Review" tab, which has a dropdown for:
  - **Searching and reviewing movies** based on generation and popularity.
  - **Finding movies by region** and popularity to see what's popular globally or locally.
  - **Discovering trending movies**, getting insights into what’s currently popular.

### Movie Location Page
Navigate to the "Movie Location" Page by clicking on the "Movie Location" tab. This page allows you to:
  - **Locate movies by name** and get details like the filming location address.
  - **View images** from those locations to explore the setting visually.

### About Page
The "About" Page can be accessed via the "About" tab, offering insights into:
  - **Our mission** and what drives our app development.
  - **Who we are**, introducing our team members and their roles.

### Contact Page
The Contact Page is available under the "Contact" tab, where users can:
  - **Report inaccuracies** or outdated information.
  - **Submit news** or suggestions related to movie data or app features.

## Getting Started

To run the Movie Search App locally, follow these steps:

1. Clone the repository:

    ```bash
      git clone https://github.com/LemonmadeDesigns/Reel-Reviews.git
    ```

2. Navigate to the project root directory:

    ```bash
      cd Reel-Reviews
    ```

3. Install dependencies in root directory:

    ```bash
      npm install
    ```

4. Navigate to the project client directory:

    ```bash
      cd client
    ```

5. Install dependencies in client directory:

    ```bash
      npm install
    ```

6. Configure environment variables (if any):

    ```bash
      # Create a .env file and add your environment variables
      REACT_APP_API_KEY=your_api_key
    ```

7. Start the application in your client directory:

    ```bash
      npm run dev #start backend and frontend simultaneously
    ```

8. Deploy the application with a single command, in your client directory:

    ```bash
      npm run deploy "Your commit message here"
    ```

### Pushing Changes to the Repository

This section, titled "Pushing Changes to the Repository," provides instructions on how to stage, commit, and push changes to your repository. Make sure to replace `'main'` with the appropriate branch name if you're working on a different branch.

To push new changes to the repository, follow these steps:

1. Make changes to the code as needed.

2. Stage your changes for commit:

    ```bash
      git add .
    ```

3. Commit your changes with a meaningful message:

    ```bash
    git commit -m "Add new feature" # Replace with your message
    ```

4. Push your changes to the remote repository (GitHub, GitLab, etc.):

    ```bash
    git push origin main # Replace 'main' with your branch name
    ```

### Integrating `npm run deploy` into your project

To implement the `npm run deploy` command, modify the `scripts` section of your project's `package.json` file by adding the following line:

   ```json
  "scripts": {
  "deploy": "bash deploy.sh"
  }
  ```

### License

This project is licensed under the MIT License.

### Acknowledgments

The Movie Database (TMDb) for providing movie data
Bootstrap for the styling framework

### Contact

For inquiries or collaboration opportunities, please contact us:

- GitHub: [GitHub Profile](https://github.com/LemonmadeDesigns/Reel-Reviews)
- Heroku: [Reel Review](https://reel-reviews-f48354ff4a5a.herokuapp.com/#/Region_Reviews)

Please replace the placeholder `your-username` with your actual GitHub username and `your_api_key` with your API key for TMDb. Additionally, you can further customize the README.md as needed for the project.
