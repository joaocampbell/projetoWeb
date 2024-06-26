document.addEventListener('DOMContentLoaded', function() {
    const movies = [
        { 
            title: 'Interstellar', 
            genres: ['Science Fiction', 'Action', 'Adventure'], 
            page: 'movies/Interstellar.html',
            img: 'img/movie/Interstellar_Trailer1.jpg', // URL of the movie image
            platforms: ["Amazon Prime"]
        },
        { 
            title: 'Iron man 3', 
            genres: ['Science Fiction', 'Action'], 
            page: 'movies/ironman.html',
            img: 'img/poste/2.jpg', // URL of the movie image
            platforms: ["Netflix", "Amazon Prime", "Disney+", "HBO Max"]
        },
        { 
            title: 'Fifty Shades of Grey', 
            genres: ['Romance', 'Erotic'], 
            page: 'movies/FiftyShadesofGrey.html',
            img: 'img/poste/1.jpg', // URL of the movie image
            platforms: ["Hulu"]
        },
        { 
            title: 'The Maze Runner', 
            genres: ['Action', 'Science Fiction'], 
            page: 'movies/TheMazeRunner.html',
            img: 'img/poste/3.jpg', // URL of the movie image
            platforms: ["Netflix"]
        },
        { 
            title: 'Carbono Alterado', 
            genres: ['Cyberpunk', 'Science Fiction'], 
            page: 'movies/CarbonoAlterado.html',
            img: 'img/poste/4.jpg', // URL of the movie image
            platforms: ["Disney+", "HBO Max"]
        },
        { 
            title: 'Blade Runner', 
            genres: ['Cyberpunk', 'Science Fiction', 'Action'], 
            page: 'movies/BladeRunner.html',
            img: 'img/poste/5.jpg', // URL of the movie image
            platforms: ["Netflix", "Amazon Prime", "Disney+", "HBO Max", "Hulu"]
        }
        // Add more movies with their respective genres, pages, and images
    ];
    

    const genreTableContainer = document.getElementById('genreTableContainer');
    const selectedGenreTitle = document.getElementById('selectedGenreTitle');
    const movieList = document.getElementById('movieList');

    // Create genre table
    const genres = createGenreTable();
    genreTableContainer.appendChild(genres);

    // Add event listener to genre table
    genreTableContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'TD') {
            const genre = event.target.textContent;
            selectedGenreTitle.textContent = `Movies in ${genre}`;
            displayMoviesByGenre(genre);
        }
    });

    function createGenreTable() {
        const genres = [];
        movies.forEach(movie => {
            movie.genres.forEach(genre => {
                if (!genres.includes(genre)) {
                    genres.push(genre);
                }
            });
        });

        const genreTable = document.createElement('table');
        genres.forEach(genre => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = genre;
            row.appendChild(cell);
            genreTable.appendChild(row);
        });

        return genreTable;
    }

    function displayMoviesByGenre(genre) {
        movieList.innerHTML = '';
        const moviesWithGenre = movies.filter(movie => movie.genres.includes(genre));
        
        const table = document.createElement('table');
        table.classList.add('movie-table'); // Add a class to the table for styling
    
        moviesWithGenre.forEach(movie => {
            const row = table.insertRow();
            const cell = row.insertCell();
    
            const movieLink = document.createElement('a');
            movieLink.href = movie.page; // Set the href to the movie page
    
            const movieImageContainer = document.createElement('div');
            movieImageContainer.classList.add('movie-image-container'); // Add a class to the image container for styling
    
            const movieImage = document.createElement('img');
            movieImage.src = movie.img; // Set the src of the movie image
            movieImage.alt = movie.title; // Set the alt text for the image
    
            const movieTitle = document.createElement('div');
            movieTitle.textContent = movie.title; // Set the text content of the movie title
            movieTitle.classList.add('movie-title'); // Add a class to the title for styling
    
            movieImageContainer.appendChild(movieImage);
            movieImageContainer.appendChild(movieTitle);
            movieLink.appendChild(movieImageContainer);
            cell.appendChild(movieLink);
        });
    
        movieList.appendChild(table);
    }

    
    
    
});
