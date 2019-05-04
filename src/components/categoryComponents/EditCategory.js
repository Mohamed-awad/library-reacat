import React, {Component} from 'react';
import {Input} from "reactstrap";
import '../../App.css'

class TableWithPagination extends Component {
    render() {
        return (
            <table className="c marginTable table table-striped table-bordered table-sm " cellSpacing="5">
                <thead>
                <tr className='c'>
                    <th className="th-sm">Cover
                    </th>
                    <th className="th-sm">Name
                    </th>
                    <th className="th-sm">Author
                    </th>
                    <th className="th-sm">Avg Rate
                    </th>
                    <th className="th-sm">Rating
                    </th>
                    <th className="th-sm co">Shelve
                        <tr>
                        </tr>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default TableWithPagination;
