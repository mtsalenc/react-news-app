import React, {Component} from 'react';

import SingleNewsItem from './SingleNewsItem.js';

class AllNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  fetchNews = async () => {
    const self = this;
    const api_key = "00996750f97644cca91df97021253add";
    const { handle } = self.props.match.params;
    const api_endpoint = `https://newsapi.org/v2/everything?q=${handle}&sortBy=publishedAt&language=en&apiKey=${api_key}`;

    await fetch(api_endpoint).then(function (response){
      const data = response.data;
      const news = data.articles.slice(0, 30);
      //console.log(handle);

      self.setState({
        news: news
      });
    }).catch(function (err){
      console.log(err);
    })
  }

  componentDidMount = () => {
    this.fetchNews();
  }

  componentWillReceiveProps = () => {
    this.fetchNews();
  }

  renderNewsItems(){
    return this.state.news.map((item, i) => (
      <SingleNewsItem key={i} item={item}/>
    ));    
  }

  render() {
    return (
      <div className="row no-gutter">
        {this.renderNewsItems()}
      </div>
    );
  }

}

export default AllNews;