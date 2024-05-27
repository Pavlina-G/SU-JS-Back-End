function findMovieAdded(movies, filteredMovies) {

    const mergedMovies = movies.concat(filteredMovies.filter(m2 =>
        !movies.some(m1 => m1.id === m2.id)
    ));
    
    return mergedMovies;
}

module.exports = {
    findMovieAdded
}