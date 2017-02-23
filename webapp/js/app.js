var client = new XMLHttpRequest(),
	objectifyMarkdownNotWomen = new marked.Renderer(),
	moviesCollection,
	movies,
	cellCounter = 0,
	lastHeading = '',
	headers = ['movie', 'genre', 'year', 'rating'];


objectifyMarkdownNotWomen.heading = function(heading, level) {
	lastHeading = heading;
};

objectifyMarkdownNotWomen.tablerow = function(content) {
	cellCounter = 0;
	movies.push({});
};

objectifyMarkdownNotWomen.tablecell = function(content, flags) {
	movies[movies.length - 1][headers[cellCounter]] = content;
	cellCounter++;
};

objectifyMarkdownNotWomen.table = function(header, body) {
	// Test if the first movie object is actually just the headers (which it will be)
	if (movies[0][headers[0]].toLowerCase() == headers[0]) {
		movies.splice(0, 1);
	}
	// Similarly, test if the very last movie object is empty and pop it
	if (movies[movies.length - 1][headers[0]] == null) {
		movies.pop();
	}
	// Add movies to collection
	moviesCollection.push({
		heading: lastHeading,
		movies: movies
	});
	movies = [{}];
};

client.open('GET', window.location.href + '/README.md');
client.onreadystatechange = function(e) {
	// Whipe movies and collections as this'll run a bunch of times
	moviesCollection = [];
	movies = [{}];

	/*
	// Test markdown:
	marked("## Thrillers / Drama\n\n| MOVIE                                                                                      | GENRE                     | YEAR | RATING |\n|--------------------------------------------------------------------------------------------|---------------------------|------|--------|\n| [WarGames: The Dead Code](http://www.imdb.com/title/tt0865957/)                            | Thriller/Drama            | 2008 | 4.5/10 |\n| [WarGames](http://www.imdb.com/title/tt0086567/)                                           | Thriller/Drama            | 1983 | 7.1/10 |\n| [Hackers](http://www.imdb.com/title/tt0113243/)                                            | Crime/Drama               | 1995 | 6.2/10 |\n\n## Science Fiction / Fantasy\n\n| MOVIE                                                                                      | GENRE                     | YEAR | RATING |\n|--------------------------------------------------------------------------------------------|---------------------------|------|--------|\n| [The Matrix](http://www.imdb.com/title/tt0133093/)                                         | Fantasy/Action            | 1999 | 8.7/10 |\n| [The Lawnmower Man](http://www.imdb.com/title/tt0104692/)                                  | Fantasy/Action            | 1992 | 5.4/10 |", {
	*/
	marked(client.responseText, {
		renderer: objectifyMarkdownNotWomen
	}, function() {
		console.log(moviesCollection);
		document.body.innerHTML = JSON.stringify(moviesCollection);
	});
};
client.send();

function baseUrl() {
	var href = window.location.href.split('/');
	return href[0]+'//'+href[2]+'/';
}
