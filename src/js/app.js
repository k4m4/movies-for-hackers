/**
 * Vars
 */
var client = new XMLHttpRequest(),
  objectifyMarkdownNotWomen = new marked.Renderer(),
  moviesCollection,
  movies,
  cellCounter = 0,
  lastHeading = '',
  headers = ['movie', 'genre', 'year', 'rating'];

/**
 * React Table Component
 * Using https://github.com/AllenFang/react-bootstrap-table
 */
const parseNowt = (cell, row) => {
  return cell;
};
const parseTheImdb = (cell, row) => {
  // Make it like 7.1 rather than 7.1/10, we all know what it's out of.
  if (cell != null) {
    return cell.replace('/10', '');
  }
};

class Table extends React.Component {
  // Runs on init
  constructor(props) {
    // pass props to the base constructor:
    super(props);

    this.movies = props.movies;

    this.columns = [];

    // Create table headers (the rest is all handled by the plugin)
    headers.map((header, i) => {
      let isFirstItem = i == 0,
        parseImdb = header == 'rating';
      this.columns.push(
        <TableHeaderColumn
          key={i}
          isKey={isFirstItem}
          dataFormat={parseImdb ? parseTheImdb : parseNowt}
          dataField={header}
          dataSort={true}
        >
          {header}
        </TableHeaderColumn>
      );
    });
  }

  // Runs on render
  render() {
    return (
      <BootstrapTable data={this.movies} hover={true}>
        {this.columns}
      </BootstrapTable>
    );
  }
}

/**
 * Custom renderer for Marked plugin
 * Turning the parsed markdown into an array of objects
 */
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

// Ajax the markdown file with all movie data
client.open('GET', window.location.href + 'readme.md');
client.onreadystatechange = function(e) {
  // Wipe movies, collections and content as this'll run a bunch of times
  document.getElementById('root').innerHTML = '';
  moviesCollection = [];
  movies = [{}];

  /*
	// Test markdown:
	marked("## Thrillers / Drama\n\n| MOVIE | GENRE | YEAR | RATING |\n|--------------------------------------------------------------------------------------------|---------------------------|------|--------|\n| [WarGames: The Dead Code](http://www.imdb.com/title/tt0865957/) | Thriller/Drama | 2008 | 4.5/10 |\n| [WarGames](http://www.imdb.com/title/tt0086567/) | Thriller/Drama | 1983 | 7.1/10 |\n| [Hackers](http://www.imdb.com/title/tt0113243/) | Crime/Drama | 1995 | 6.2/10 |\n\n## Science Fiction / Fantasy\n\n| MOVIE | GENRE | YEAR | RATING |\n|--------------------------------------------------------------------------------------------|---------------------------|------|--------|\n| [The Matrix](http://www.imdb.com/title/tt0133093/) | Fantasy/Action | 1999 | 8.7/10 |\n| [The Lawnmower Man](http://www.imdb.com/title/tt0104692/) | Fantasy/Action | 1992 | 5.4/10 |", {
	*/

  marked(
    client.responseText,
    {
      renderer: objectifyMarkdownNotWomen
    },
    function() {
      if (moviesCollection[0] == null) {
        return;
      }
      console.log(moviesCollection);
      //document.body.innerHTML = JSON.stringify(moviesCollection);

      // Create JSX for tables of each set of movies in moviesCollection
      var moviesCollectionJSX = [];
      moviesCollection.map((movies, i) => {
        moviesCollectionJSX.push(
          <div key={i}>
            <h2>
              {movies.heading}
            </h2>
            <Table movies={movies.movies} />
          </div>
        );
      });

      ReactDOM.render(
        <div>
          {moviesCollectionJSX}
        </div>,
        document.getElementById('root')
      );
    }
  );
};
client.send();
