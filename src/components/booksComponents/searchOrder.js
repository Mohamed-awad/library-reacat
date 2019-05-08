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
            <div className='row col-12'>
                <div className='col-4'>
                    <input className="btn btn-lg"
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.updateSearch}
                           value={this.state.searchValue}
                    />
                </div>
                <div className="col-2">
                    <button className=" btn btn-primary btn-lg"
                            onClick={this.searchForResult}
                    >
                        Search
                    </button>
                </div>
                <div className='offset-2 col-2'>
                    <button
                        className=" btn btn-primary btn-lg"
                        onClick={this.handelArrangeRate}
                    >
                        Rate
                    </button>
                </div>
                <div className='col-2'>
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
