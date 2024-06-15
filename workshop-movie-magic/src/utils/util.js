function findMovieAdded(movies, filteredMovies) {

    const mergedMovies = movies.concat(filteredMovies.filter(m2 =>
        !movies.some(m1 => m1.id === m2.id)
    ));

    return mergedMovies;
}

function parseError(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            //Generic error

            err.errors = [err.message];
        } else {
            //Mongoose error

            const error = new Error('Input validation error');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));

            return error;
        }
    } else if (Array.isArray(err)) {
        // Express-validator error array

        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

        return error;
    }

    return err;
}


module.exports = {
    findMovieAdded,
    parseError
}