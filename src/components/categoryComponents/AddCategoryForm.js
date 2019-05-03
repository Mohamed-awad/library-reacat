import React , {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import GetCategories from "../../service/category";
import DeleteCategory from '../../service/delCategory';
import AddCategory from "../../service/addCategory";
import EditCategory from "../../service/editCategory";

class AddCategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            modalIsOpen: false,
            newCategory: "",
            categories : [],
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }

    handle_modal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handling_modal(event) {
        if(event.target.name === "edit")
        {
            this.handle_updateCategory(event);
        }
        this.setState(prevState => ({
            EditModal: !prevState.EditModal,
        }));
    }



    handle_updateCategory =(event)=>{
        if(event.target.name === "edit"){
            let data = JSON.parse(event.target.value);
            this.setState({
                newCategory: data,
            });
        } else if(event.target.name === "name_edit") {
            this.setState({
                newCategory: {...this.state.newCategory, name: event.target.value},
            });
        } else {
            this.setState({
                newCategory: event.target.value,
            });
        }

    }

    handle_addCategory =()=>{
        if((/^ *$/.test(this.state.newCategory)) || (/^$/.test(this.state.newCategory))) {
            alert("please enter valid category");
        }
        else {
            AddCategory({
            'name': this.state.newCategory,
            }).then(data => {
                GetCategories()
                .then(data => {
                    this.setState({
                        categories: data,
                        newCategory : "",
                    });
                    alert("category added successfully");
                });
            });
        }

    }

    handle_EditCategory =()=>{
        EditCategory(this.state.newCategory).then(data => {
            console.log(data);
            GetCategories()
            .then(data => {
                console.log(data);
                this.setState({
                    categories: data,
                    newCategory : "",
                });
            });
        });
    }


    componentDidMount(){
      GetCategories()
      .then(data => {
        this.setState({
            categories: data,
        })
      });
    }

    deletRow = (index) =>{
        const categories = [...this.state.categories];
        console.log(categories[index.target.value]._id);
        DeleteCategory(categories[index.target.value]._id).then((data) => {
            console.log(data);
        });
        categories.splice(index.target.value,1);
        this.setState({categories});
    }

    render() {

        return (
            <div>
                <button onClick={this.handle_modal} className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>
                    {this.props.title} +</button>
            <Modal isOpen={this.state.modal} toggle={this.handle_modal}
                   className={this.props.className}>
                <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type="name" name="name_add" id="name" placeholder="Add Category"
                               value={this.state.newCategory}
                               onChange={this.handle_updateCategory} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handle_modal}
                            onClick={this.handle_addCategory}>{this.props.title}</Button>{' '}
                    <Button color="secondary" onClick={this.handle_modal}>{this.props.cancel}</Button>
                </ModalFooter>
            </Modal>

                <Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
                       className={this.props.className}>
                    <ModalHeader toggle={this.handling_modal}>Edit Category</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input value={this.state.newCategory.name} type="name"
                                   name="name_edit" id="name"
                                   onChange={this.handle_updateCategory}
                                   placeholder="Edit Category"  />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handling_modal}
                        onClick={this.handle_EditCategory} >Edit</Button>{' '}
                        <Button name="cancel" color="secondary"
                                onClick={this.handling_modal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                    <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <thead>
                    {this.state.categories.map((category , index) =>
                        <tr>
                            <th>{index+1}</th>
                            <th key={index}>
                                {category.name}
                            </th>
                            <th>
                                <button value={JSON.stringify(category)} type="button"
                                        name="edit"
                                        className="btn btn-info"
                                        onClick={this.handling_modal}
                                        >Edit</button> {" "}
                                <button value={index} onClick={this.deletRow.bind(this)}
                                    type="button" className="btn btn-danger">Delete</button> </th>
                        </tr>)}
                    </thead>
                </Table>
        </div>

        );
    }
}
export default AddCategoryForm;
