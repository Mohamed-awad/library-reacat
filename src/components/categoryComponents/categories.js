import React, {Component} from 'react';
import '../../Styles/sidebar.css'

class Categories extends Component {
    componentDidMount() {
        console.log(this.props.catego);
    }

    render() {
        const category = this.props.catego.map((category, index) =>
            <div className='col-2' key={category.data.id}>
                <div onClick={() => {
                    this.props.onClick(category.data.id)
                }} className='orderItem'>
                    <p>
                        {category.data.name}
                    </p>
                </div>
            </div>
        );

        return (
            <div className="sidenav">
                <p onClick={() => {
                    this.props.onClick()
                }} >All books</p>
                {category}
            </div>
        );
    }
}

export default Categories;
