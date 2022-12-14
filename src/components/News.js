import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps ={
    country : 'in',
    pageSize : 5,
    category: 'general',
  }

  static propTypes = {
     country: PropTypes.string,
     pageSize:PropTypes.number,
     category: PropTypes.string,
  }

  constructor(){
    super();
    console.log("I am a constructor");
    this.state = {
       articles: [],
       loading: false,
       page: 1
   }
     
  }

 async componentDidMount(){
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9eb19fdec91841bcbd399168bf5aa0ae&page=
     ${this.state.page - 1}&pageSize=${this.props.pageSize}`;
     this.setState({loading: true});
     let data = await fetch(url);
     let parsedData = await data.json()
     console.log(parsedData);
     this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false 
  })
  
  }

  myPrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9eb19fdec91841bcbd399168bf5aa0ae&page=
    ${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
 
   myNextClick = async () => {
     console.log("Next")
     if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9eb19fdec91841bcbd399168bf5aa0ae&page=${this.state.page+1}&pageSize=
    ${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading: false
    })
   
  }
}


  render() {
    return (
      <div className='container my-3'>
      <h1 className='text-center' style={{margin: '35px 0px'}}> NewsMonkey - Top Headlines </h1>
     {this.state.loading && <Spinner />}
      <div className="row">
      {!this.state.loading && this.state.articles?.map((element) =>{
        return <div className="col-md-4" key={element.url}>
      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage}
      newsUrl ={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
      </div>
      })}
     </div>
     <div className="container d-flex justify-content-between">
     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.myPrevClick}> &larr; Previous</button>
     <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.myNextClick}>Next &larr; </button>
     </div>
      </div>
    )
  }
}

export default News
