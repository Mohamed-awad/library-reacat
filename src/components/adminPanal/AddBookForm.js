import React, {Component} from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import GetBooks from "../../service/book/book";
import DeleteBook from "../../service/book/delBook";
import GetCategories from "../../service/category/category";
import AddBook from "../../service/book/addBook";
import EditBook from "../../service/book/editBook";

class AddBookForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      books: [],
      authors: [],
      newBook: {},
      categories: [],
    };
    this.handle_modal = this.handle_modal.bind(this);
    this.handling_modal = this.handling_modal.bind(this);
  }


  handle_modal() {
    // GetCategories()
    // .then(data => {
    //     console.log("1");
    //   this.setState({
    //       categories: data.data,
    //       newBook: {...this.state.newBook, categoryId: data.data[0].id},
    //   });
    // }).then(() => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    // });
  }

  handle_updateBook = (event) => {
    if (event.target.name === "edit") {
      this.setState({
        newBook: JSON.parse(event.target.value),
      });
    } else if (event.target.name === "name") {
      this.setState({
        newBook: {...this.state.newBook, title: event.target.value,}
      });
    } else if (event.target.name === "description") {
      this.setState({
        newBook: {...this.state.newBook, description: event.target.value,}
      });
    } else if (event.target.name === "select") {
      console.log(event.target.value);
      this.setState({
        newBook: {...this.state.newBook, category_id: event.target.value,}
      });
    } else if (event.target.name === "select1") {
      console.log(event.target.value);
      this.setState({
        newBook: {...this.state.newBook, author: event.target.value,}
      });
    } else if (event.target.name === "num_of_book") {
      console.log(event.target.value);
      this.setState({
        newBook: {...this.state.newBook, NumberOfBook: event.target.value,}
      });
    } else if (event.target.name === "lease_per_day") {
      console.log(event.target.value);
      this.setState({
        newBook: {...this.state.newBook, leasePerDay: event.target.value,}
      });
    } else if (event.target.name === "file") {
      let path = event.target.files[0];
      console.log(path);
      this.setState({
        newBook: {...this.state.newBook, image: path,}
      });
    }
  }

  handling_modal(event) {
    this.handle_updateBook(event);
    this.setState(prevState => ({
      EditModal: !prevState.EditModal
    }));
  }

  handle_addBook = () => {
    if (!this.state.newBook.title ||
        (/^ *$/.test(this.state.newBook.title)) ||
        (/^$/.test(this.state.newBook.title))) {
      alert("please enter valid book title");
    } else {
      AddBook(this.state.newBook).then(data => {
        console.log(data);
        let books = [...this.state.books, data.data]
        this.setState({
          books,
          newBook: "",
        });
        alert("book added successfully");
      });
    }
  }

  handle_EditBook = () => {
    console.log(this.state.newBook);
    EditBook(this.state.newBook).then(data => {
      console.log(data);
      GetBooks().then((data) => {
        this.setState({
          books: data.data,
          newBook: '',
        });
        alert("book updated successfully");
      })
    });
  }

  deletRow = (index) => {
    DeleteBook(index.target.value).then((data) => {
      GetBooks().then(data => {
        this.setState({
          books: data.data,
          newBook: "",
        });
        alert("book deleted successfully");
      });
    });
  }

  componentDidMount() {
    GetBooks()
        .then(data => {
          console.log(data);
          this.setState({
            books: data.data,
          })
        });
    GetCategories()
        .then(data => {
          this.setState({
            categories: data.data,
            newBook: {...this.state.newBook, category_id: data.data[0].id},
          });
        });
  }

  render() {
    return (

        <div>
          <button onClick={this.handle_modal}
                  className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>{this.props.title} +
          </button>
          <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
            <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="name">Book title</Label>
                  <Input type="name" name="name" id="name"
                         placeholder="Book title" value={this.state.newBook.title}
                         onChange={this.handle_updateBook}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Description</Label>
                  <Input type="description" name="description" id="description"
                         placeholder="Book description" value={this.state.newBook.description}
                         onChange={this.handle_updateBook}/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Select Category</Label>
                  <Input type="select" name="select" id="exampleSelect"
                         onChange={this.handle_updateBook}>
                    {this.state.categories.map((category, index) =>
                        <option key={category.data.id} value={category.data.id}>{category.data.name}</option>
                    )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Author Name</Label>
                  <Input name="select1" id="exampleSelect" value={this.state.newBook.author}
                         onChange={this.handle_updateBook}>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="num_of_book">Number of books</Label>
                  <Input type="number" min={0} name="num_of_book" id="num_of_book"
                         onChange={this.handle_updateBook} value={this.state.newBook.NumberOfBook}
                  >
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="lease_per_day">lease per day</Label>
                  <Input type="number" min={0} name="lease_per_day" id="lease_per_day"
                         onChange={this.handle_updateBook} value={this.state.newBook.leasePerDay}
                  >
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Upload Image</Label>
                  <Input type="file" name="file" id="exampleFile"
                         onChange={this.handle_updateBook}
                      // onChange= {this.onChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handle_modal}
                      onClick={this.handle_addBook}>{this.props.title}</Button>{' '}
              <Button color="secondary" onClick={this.handle_modal}>
                {this.props.cancel}</Button>
            </ModalFooter>

          </Modal>

          <Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
                 className={this.props.className}>
            <ModalHeader toggle={this.handling_modal}>Edit Book</ModalHeader>
            <ModalBody>
              <Form>
                {/*----------------------*/}
                <FormGroup>
                  <Label for="name">Edit Book title</Label>
                  <Input type="name" name="name" id="name"
                         placeholder="Edit Book title"
                         value={this.state.newBook.title}
                         onChange={this.handle_updateBook}/>
                </FormGroup>

                <FormGroup>
                  <Label for="name">Description</Label>
                  <Input type="description" name="description" id="description"
                         placeholder="Book description" value={this.state.newBook.description}
                         onChange={this.handle_updateBook}/>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleSelect">Edit Category</Label>
                  <Input value={this.state.newBook.category_id} type="select" name="select" id="exampleSelect"
                         onChange={this.handle_updateBook}>
                    {this.state.categories.map((category, index) =>
                        <option key={category.data.id} value={category.data.id}>{category.data.name}</option>
                    )}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleSelect">Edit Author Name</Label>
                  <Input type="select1" name="select1" id="exampleSelect"
                         value={this.state.newBook.author}
                         onChange={this.handle_updateBook}>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="num_of_book">edit Number of books</Label>
                  <Input type="number" min={0} name="num_of_book" id="num_of_book"
                         onChange={this.handle_updateBook} value={this.state.newBook.NumberOfBook}
                  >
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="lease_per_day">edit lease per day</Label>
                  <Input type="number" min={0} name="lease_per_day" id="lease_per_day"
                         onChange={this.handle_updateBook} value={this.state.newBook.leasePerDay}
                  >
                  </Input>
                </FormGroup>
              </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handling_modal}
                      onClick={this.handle_EditBook}>
                Edit
              </Button>
              {' '}
              <Button color="secondary" onClick={this.handling_modal}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Table>
            <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Des</th>
              <th>Author</th>
              <th>Image</th>
              <th>No. books</th>
              <th>Lease per day</th>
              <th>Actions</th>
            </tr>
            </thead>

            <thead>
            {this.state.books.map((book) =>
                <tr key={book.id}>
                  <th>{book.category.name}</th>
                  <th>{book.title}</th>
                  <th>{book.description}</th>
                  <th>{book.author}</th>
                  <th key={book.id}>
                    <img src={"http://localhost:8001/image/" + book.image}
                         width="50" height="50" alt="error image"/>
                  </th>
                  <th>{book.NumberOfBook}</th>
                  <th>{book.leasePerDay}</th>
                  <th>
                    <button value={JSON.stringify(book)} type="button"
                            className="btn btn-info"
                            name="edit"
                            onClick={this.handling_modal}>Edit
                    </button>
                    {" "}
                    <button value={book.id} onClick={this.deletRow.bind(this)}
                            type="button" className="btn btn-danger">Delete
                    </button>
                  </th>
                </tr>)}

            </thead>
          </Table>
        </div>);
  }
}

export default AddBookForm;
