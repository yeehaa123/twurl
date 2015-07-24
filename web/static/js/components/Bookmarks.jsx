import React, { PropTypes, Component } from 'react';

class Bookmarks extends Component {
  static propTypes = {
    addBookmark: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = { formTitle: '', formUrl: '' };
  }

  addBookmark(event){
    event.preventDefault();
    const { addBookmark } = this.props;
    const { formTitle, formUrl } = this.state;
    if(formTitle !== '' && formUrl !== ''){
      addBookmark(formTitle, formUrl);
    }
  }

  handleChangeTitle(event){
    let title = event.target.value;
    this.setState({formTitle: title});
  }

  handleChangeUrl(event){
    let url = event.target.value;
    this.setState({formUrl: url});
  }

  render(){
    let { bookmarks, dispatch } = this.props;
    let { formTitle, formUrl } = this.state;
    let items = bookmarks.map(({ url, title }, index) => (
      <li key={ index }><a href={ url }>{ title }</a></li>
    ));
    return (
      <section>
        <ul>
            { items }
        </ul>
        <form onSubmit={ this.addBookmark.bind(this) }>
          <label htmlFor="title">Title</label>
          <input onChange={ this.handleChangeTitle.bind(this) } value={ formTitle } type="text" name="title" defaultValue="Title"/>
          <label htmlFor="url">Url</label>
          <input ref="url" onChange={ this.handleChangeUrl.bind(this) } type="text" value={ formUrl } name="url" defaultValue="Url"/>
          <input type="submit" value="submit"/>
        </form>
      </section>
    );
  }
}

export default Bookmarks;
