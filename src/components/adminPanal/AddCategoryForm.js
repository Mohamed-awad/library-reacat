import React, {Component} from 'react';
import {Button, FormGroup, Input, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import GetCategories from "../../service/category/category";
import DeleteCategory from '../../service/category/delCategory';
import AddCategory from "../../service/category/addCategory";
import EditCategory from "../../service/category/editCategory";
import Pagination from './Pagination';


class AddCategoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      newCategory: "",
      catDes: "",
      categories: [],
      pageOfItems: []
    };
    this.handle_modal = this.handle_modal.bind(this);
    this.handling_modal = this.handling_modal.bind(this);
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({pageOfItems: pageOfItems});
  }

  handle_modal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  handling_modal(event) {
    if (event.target.name === "edit") {
      this.handle_updateCategory(event);
    }
    this.setState(prevState => ({
      EditModal: !prevState.EditModal,
    }));
  }


  handle_updateCategory = (event) => {
    if (event.target.name === "edit") {
      let data = JSON.parse(event.target.value);
      this.setState({
        newCategory: data,
      });
    } else if (event.target.name === "name_edit") {
      this.setState({
        newCategory: {...this.state.newCategory, name: event.target.value},
      });
    } else if (event.target.name === "des_edit") {
      this.setState({
        newCategory: {...this.state.newCategory, description: event.target.value},
      });
    } else if (event.target.name === "name_add") {

      this.setState({
        newCategory: event.target.value,
      });
    } else if (event.target.name === "name_des") {

      this.setState({
        catDes: event.target.value,
      });
    }

  }

  handle_addCategory = () => {
    if ((/^ *$/.test(this.state.newCategory)) || (/^$/.test(this.state.newCategory))) {
      alert("please enter valid category");
    } else {
      AddCategory({
        'name': this.state.newCategory,
        'description': this.state.catDes
      }).then(data => {
        GetCategories()
            .then(data => {
              this.setState({
                categories: data.data,
                newCategory: "",
                catDes: "",
              });
              alert("category added successfully");
            });
      });
    }

  }

  handle_EditCategory = () => {
    EditCategory(this.state.newCategory).then(data => {
      let categories = [...this.state.categories, data.data]
      this.setState({
        categories,
        newCategory: "",
        catDes: "",
      });
      alert("category updated successfully");
    });
  }


  componentDidMount() {
    GetCategories()
        .then(data => {
          this.setState({
            categories: data.data,
          })
        });
  }

  deletRow = (index) => {
    const categories = [...this.state.categories];
    DeleteCategory(categories[index.target.value - 1].data.id).then((data) => {
      console.log(data);
    });
    categories.splice(index.target.value - 1, 1);
    this.setState({categories});
  }

  render() {

    return (
        <div>
          <button onClick={this.handle_modal}
                  className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>
            {this.props.title} +
          </button>
          <Modal isOpen={this.state.modal} toggle={this.handle_modal}
                 className={this.props.className}>
            <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input type="name" name="name_add" id="name" placeholder="Add Category"
                       value={this.state.newCategory}
                       onChange={this.handle_updateCategory}/>
              </FormGroup>
              <FormGroup>
                <Input type="name" name="name_des" id="name" placeholder="Description"
                       value={this.state.catDes}
                       onChange={this.handle_updateCategory}/>
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
                       placeholder="Edit Category"/>
              </FormGroup>
              <FormGroup>
                <Input value={this.state.newCategory.description} type="name"
                       name="des_edit" id="name"
                       onChange={this.handle_updateCategory}
                       placeholder="Edit Description"/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handling_modal}
                      onClick={this.handle_EditCategory}>Edit</Button>{' '}
              <Button name="cancel" color="secondary"
                      onClick={this.handling_modal}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Table>
            <thead>
            <tr>

              <th>Category name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            </thead>
            <thead>
            {this.state.pageOfItems.map((category) =>
                <tr key={category.data.id}>
                  <th>{category.data.name}</th>
                  <th key={category.data.id}>
                    {category.data.description}
                  </th>
                  <th>
                    <button value={JSON.stringify(category.data)} type="button"
                            name="edit"
                            className="btn btn-info"
                            onClick={this.handling_modal}
                    >Edit
                    </button>
                    {" "}
                    <button value={category.data.id} onClick={this.deletRow.bind(this)}
                            type="button" className="btn btn-danger">Delete
                    </button>
                  </th>
                </tr>)}
            </thead>
          </Table>
          <div>
            <Pagination className={"pagination"} items={this.state.categories} onChangePage={this.onChangePage}/>
          </div>
        </div>
    );
  }
}

export default AddCategoryForm;
