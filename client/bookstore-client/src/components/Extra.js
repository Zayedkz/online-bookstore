import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Container, Button, Input, Table } from 'reactstrap';
import axios from 'axios';

export default class Extra extends Component {
    state = {
        view1: null,
        view2: null,
        view3: null,
        view4: null,
        view5: null,
        view6: null,
        view7: null,
        view8: null,
        view9: null,
        view10: null
    }
    componentWillMount = () => {
        this.queryDatabase();
    }
    queryDatabase = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/extra/view1",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              localStorage.setItem('view1', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view2",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view2', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view3",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view3', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view4",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view4', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view5",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view5', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view6",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view6', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view7",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view7', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view8",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view8', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view9",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view9', JSON.stringify(res.data));
          });
          axios({
            method: "GET",
            url: "http://localhost:5000/extra/view10",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            localStorage.setItem('view10', JSON.stringify(res.data));
          });
    }
    componentDidMount = () => {
        const views = [
            JSON.parse(localStorage.getItem('view1')),
            JSON.parse(localStorage.getItem('view2')),
            JSON.parse(localStorage.getItem('view3')),
            JSON.parse(localStorage.getItem('view4')),
            JSON.parse(localStorage.getItem('view5')),
            JSON.parse(localStorage.getItem('view6')),
            JSON.parse(localStorage.getItem('view7')),
            JSON.parse(localStorage.getItem('view8')),
            JSON.parse(localStorage.getItem('view9')),
            JSON.parse(localStorage.getItem('view10'))
        ]
        const headings = [
            'View 1: Computes a join of at least three table',
            'View 2: Uses nested queries with the ANY or ALL operator and uses a GROUP BY clause',
            'View 3: A correlated nested query',
            'View 4: Uses a FULL JOIN',
            'View 5: Uses nested queries with any of the set operations UNION, EXCEPT, or INTERSECT',
            'View 6: Full outer join',
            'View 7: Amount of books supplied',
            'View 8: Orders made within date',
            'View 9: Check books inventory',
            'View 10: Books bought internationally'
        ]
        views.forEach((element, index) => {
            let div = document.getElementById('content');
            let table = document.createElement('table');
            table.classList.add('table');
            table.style.width = "75%";
            let thead = document.createElement('thead');
            let tr = document.createElement('tr');
            Object.keys(element[0]).forEach(key => {
                let th = document.createElement('th');
                th.innerHTML = key;
                tr.appendChild(th);
            })
            thead.appendChild(tr);
            table.appendChild(thead);
            let tbody = document.createElement('tbody');
            element.forEach(row => {
                let tr2 = document.createElement('tr');
                Object.values(row).forEach(value => {
                    let td = document.createElement('td');
                    td.innerHTML = value;
                    tr2.appendChild(td);
                })
                tbody.appendChild(tr2);
            });
            table.appendChild(tbody);
            let h4 = document.createElement('h4');
            h4.innerHTML = headings[index];
            div.appendChild(h4);
            div.appendChild(table);
        })
    }
    render() {
        return (
            <div id="content">
                
            </div>
            // <Container>
            //     {views.forEach((element, index) => (
            //         // <h4>{headings[index]}</h4>
            //         <Table>
            //             <thead>
            //                 <tr>
            //                     { Object.keys(element[0]).forEach(key => (
            //                         <th>{key}</th>
            //                     ))}
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 { element.forEach(row => (
            //                     <tr>
            //                         {Object.values(row).forEach(value => (
            //                             <td>{value}</td>
            //                         ))}
            //                     </tr>
            //                 ))}
            //             </tbody>
            //         </Table>
            //     ))}
            // </Container>
        )
    }
}
