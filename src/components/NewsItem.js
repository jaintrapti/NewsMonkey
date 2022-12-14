import React, { Component } from 'react'

export class NewsItem extends Component {
 

  render() {
    let {title, description, imageurl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
       <div className="card">
       <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex: '1'}}> {source}
  </span>
    <img src={!imageurl?"https://cdn.pocket-lint.com/r/s/1200x630/assets/images/163173-apps-news-feature-google-chrome-passwords-image3-us4jfqlbox.jpg":imageurl} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title"> {title} </h5>
      <p className="card-text">{description}</p>
      <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()} </small></p>
      <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
    </div>
  </div>
      </div>
    )
  }
}

export default NewsItem
