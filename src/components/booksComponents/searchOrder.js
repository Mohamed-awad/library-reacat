import React, {Component} from 'react';
import '../../App.css';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        }
    };

    handelArrangeRate = () => {
        console.log(this.props.bookShow);
        const bookShow = this.props.bookShow.sort((a, b) =>
            (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0)
        );
        this.setState({bookShow});
        console.log(this.props.bookShow);

    };
    handelArrangeLates = () => {
        console.log(this.props.bookShow);
        const bookShow = this.props.bookShow.sort((a, b) =>
            (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0)
        );
        console.log(bookShow);
        this.setState({bookShow});
    };

    updateSearch = (event) => {
        console.log(event.target.value);
        this.setState({
            searchValue: event.target.value,
        })
    };

    render() {
        return (
            <div className='row '>
                <div className='col-8 row'>
                    <div className='offset-3 col-5'>

                        <input className="btn btn-lg"
                               type="text"
                               placeholder="Search"
                               aria-label="Search"
                               onChange={this.updateSearch}
                               value={this.state.searchValue}
                        />
                    </div>
                    <div className="col-3">
                        <button className="col-10 btn btn-primary btn-lg"
                                onClick={this.searchForResult}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className='row col-4'>
                    <button
                        className="offset-6 btn btn-primary btn-lg mr-1"
                        onClick={this.handelArrangeRate}
                    >
                        Rate
                    </button>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={this.handelArrangeLates}
                    >
                        Latest
                    </button>
                </div>
            </div>

        );
    }
}

export default Search;
