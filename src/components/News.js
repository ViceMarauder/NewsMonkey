import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };
  static PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      totalResults: 0,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews();
  }
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.setState({ page: this.state.page + 1 });
      this.updateNews();
    }
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <h1>
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
          </h1>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.article.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
