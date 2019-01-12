"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _createClass = function() {
        function e(e, t) {
            for (var o = 0; o < t.length; o++) {
                var n = t[o];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, o, n) {
            return o && e(t.prototype, o), n && e(t, n), t
        }
    }(),
    client = new XMLHttpRequest,
    objectifyMarkdownNotWomen = new marked.Renderer,
    moviesCollection, movies, cellCounter = 0,
    lastHeading = "",
    headers = ["movie", "genre", "year", "rating"],
    parseNowt = function(e, t) {
        return e
    },
    parseTheImdb = function(e, t) {
        if (null != e) return e.replace("/10", "")
    },
    Table = function(e) {
        function t(e) {
            _classCallCheck(this, t);
            var o = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return o.movies = e.movies, o.columns = [], headers.map(function(e, t) {
                var n = 0 == t,
                    r = "rating" == e;
                o.columns.push(React.createElement(TableHeaderColumn, {
                    key: t,
                    isKey: n,
                    dataFormat: r ? parseTheImdb : parseNowt,
                    dataField: e,
                    dataSort: !0
                }, e))
            }), o
        }
        return _inherits(t, e), _createClass(t, [{
            key: "render",
            value: function() {
                return React.createElement(BootstrapTable, {
                    data: this.movies,
                    hover: !0
                }, this.columns)
            }
        }]), t
    }(React.Component);
objectifyMarkdownNotWomen.heading = function(e, t) {
    lastHeading = e
}, objectifyMarkdownNotWomen.tablerow = function(e) {
    cellCounter = 0, movies.push({})
}, objectifyMarkdownNotWomen.tablecell = function(e, t) {
    movies[movies.length - 1][headers[cellCounter]] = e, cellCounter++
}, objectifyMarkdownNotWomen.table = function(e, t) {
    movies[0][headers[0]].toLowerCase() == headers[0] && movies.splice(0, 1), null == movies[movies.length - 1][headers[0]] && movies.pop(), moviesCollection.push({
        heading: lastHeading,
        movies: movies
    }), movies = [{}]
}, client.open("GET", window.location.href + "readme.md"), client.onreadystatechange = function(e) {
    document.getElementById("root").innerHTML = "", moviesCollection = [], movies = [{}], marked(client.responseText, {
        renderer: objectifyMarkdownNotWomen
    }, function() {
        if (null != moviesCollection[0]) {
            console.log(moviesCollection);
            var e = [];
            moviesCollection.map(function(t, o) {
                e.push(React.createElement("div", {
                    key: o
                }, React.createElement("h2", null, t.heading), React.createElement(Table, {
                    movies: t.movies
                })))
            }), ReactDOM.render(React.createElement("div", null, e), document.getElementById("root"))
        }
    })
}, client.send();