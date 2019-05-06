import React , {Component} from 'react';
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
// import DeleteBook from "../../service/delBook";
import GetCategories from "../../service/category/category";
// import AddBook from "../../service/addBook";
// import GetAuthors from "../../service/author";
// import EditBook from "../../service/editBook";

class AddBookForm extends Component{

    constructor(props) {
        super(props);
        this.state={
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
        //       .then(data => {
        //           console.log("1");
        //         this.setState({
        //             categories: data,
        //             newBook: {...this.state.newBook, categoryId: data[0]._id},
        //         });
        //       }).then(() => {
        //           GetAuthors()
        //           .then(data => {
        //               console.log("2");
        //             this.setState({
        //                 authors: data,
        //                 newBook: {...this.state.newBook, authorId: data[0]._id},
        //             })
        //           }).then(() => {
        //               this.setState(prevState => ({
        //                 modal: !prevState.modal
        //               }));
        //           });
        //     });
    }

    handle_updateBook =(event)=>{
        if(event.target.name === "edit") {
            this.setState({
               newBook: JSON.parse(event.target.value),
            });
        }
        else if(event.target.name === "name") {
            this.setState({
                newBook: {...this.state.newBook, name: event.target.value,}
            });
        } else if(event.target.name === "select") {
            console.log(event.target.value);
            this.setState({
                newBook: {...this.state.newBook, categoryId: event.target.value,}
            });
        } else if(event.target.name === "select1") {
            console.log(event.target.value);
            this.setState({
                newBook: {...this.state.newBook, authorId: event.target.value,}
            });
        } else if(event.target.name === "file") {
            let path = event.target.files[0];
            console.log(path);
            this.setState({
                newBook: {...this.state.newBook, photo: path,}
            });
        }
    }

    handling_modal(event) {
        this.handle_updateBook(event);
        this.setState(prevState => ({
            EditModal: !prevState.EditModal
        }));
    }

    handle_addBook =()=>{
        if(!this.state.newBook.name ||
            (/^ *$/.test(this.state.newBook.name)) ||
            (/^$/.test(this.state.newBook.name))) {
            alert("please enter valid book name");
        }
        else {
            // AddBook(this.state.newBook).then(data => {
            //     console.log(data);
            //     GetBooks().then((data) => {
            //         this.setState({
            //             books: data,
            //             newBook: '',
            //         });
            //         alert("book added successfully");
            //     })
            // });
        }
    }

    handle_EditBook =()=>{
        console.log(this.state.newBook);
        // EditBook(this.state.newBook).then(data => {
        //     console.log(data);
        //     GetBooks().then((data) => {
        //         this.setState({
        //             books: data,
        //             newBook :'',
        //         });
        //     })
        // });
    }

    deletRow = (index) =>{
        const books = [...this.state.books];
        console.log(books[index.target.value]._id);
        // DeleteBook(books[index.target.value]._id).then((data) => {
        //     console.log(data);
        //     GetBooks().then(data => {
        //         this.setState({
        //             books: data,
        //             newBook: "",
        //         });
        //     });
        // });
    }

    componentDidMount(){
      GetBooks()
      .then(data => {
          console.log(data);
        this.setState({
            books: data.data,
        })
      });
      // GetCategories()
      // .then(data => {
      //   this.setState({
      //       categories: data.data,
      //       newBook: {...this.state.newBook, categoryId: data.data[0].id},
      //   });
      // });
      // GetAuthors()
      // .then(data => {
      //   this.setState({
      //       authors: data,
      //       newBook: {...this.state.newBook, authorId: data[0]._id},
      //   })
      // });
    }

    render() {
        return (

            <div>
                <button onClick={this.handle_modal} className='btn btn-info offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 add_category'>{this.props.title} +</button>
                <Modal isOpen={this.state.modal} toggle={this.handle_modal} className={this.props.className}>
                    <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Book name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Book name" value={this.state.newBook.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select Category</Label>
                                <Input type="select" name="select" id="exampleSelect"
                                       onChange={this.handle_updateBook}>
                                    {this.state.categories.map((category, index) =>
                                        <option value={category._id}>{category.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select Author</Label>
                                <Input type="select" name="select1" id="exampleSelect"

                                       onChange={this.handle_updateBook}>
                                    {this.state.authors.map((author, index) =>
                                        <option value={author._id}>
                                            {author.firstName +" "+ author.lastName}
                                        </option>
                                    )}
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
                            <FormGroup>
                                <Label for="name">Edit Book name</Label>
                                <Input type="name" name="name" id="name"
                                       placeholder="Edit Book name"
                                       value={this.state.newBook.name}
                                       onChange={this.handle_updateBook}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Edit Category</Label>
                                <Input value={this.state.newBook.categoryId} type="select" name="select" id="exampleSelect"
                                       onChange={this.handle_updateBook}>
                                    {this.state.categories.map((category, index) =>
                                        <option value={category._id}>{category.name}</option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Edit Author</Label>
                                <Input type="select" name="select1" id="exampleSelect"
                                       value={this.state.newBook.authorId}
                                       onChange={this.handle_updateBook}>
                                    {this.state.authors.map((author, index) =>
                                        <option value={author._id}>
                                            {author.firstName +" "+ author.lastName}
                                        </option>
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Edit Image</Label>
                                <Input type="file" name="file" id="exampleFile"
                                       onChange={this.handle_updateBook}
                                       // onChange= {this.onChange}
                                       />
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
                                <img src={"http://localhost:8001/api/books/"+book.image}
                                     width="50" height="50" alt="error image"/>
                            </th>
                            <th>{book.NumberOfBook}</th>
                            <th>{book.leasePerDay}</th>
                            <th>
                                <button value={JSON.stringify(book)} type="button"
                                        className="btn btn-info"
                                        name="edit"
                                        onClick={this.handling_modal}>Edit</button> {" "}
                                <button value= {book.id} onClick={this.deletRow.bind(this)}
                                    type="button" className="btn btn-danger">Delete</button> </th>
                        </tr>)}

                    </thead>
                </Table>
            </div>);
    }
}
export default AddBookForm;
