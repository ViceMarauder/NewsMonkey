import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'general'
    }
    static PropType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(){
        super()
        this.state={
            article: [],
            loading: false,
            totalResults: null,
            page:1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f3e3a900b544bc3991603889aa68124&pageSize=${this.props.pageSize}&page=1`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    handleNextClick = async ()=>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f3e3a900b544bc3991603889aa68124&pageSize=${this.props.pageSize}&page=${this.state.page+1}`
            this.setState({loading: true})
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page: this.state.page+1,
                article: parsedData.articles,
                loading: false
            })
        }
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f3e3a900b544bc3991603889aa68124&pageSize=${this.props.pageSize}&page=${this.state.page-1}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page-1,
            article: parsedData.articles,
            loading: false
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                {!this.state.loading && this.state.article.map((element)=>{
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page === 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
