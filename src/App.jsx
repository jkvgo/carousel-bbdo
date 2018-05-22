import React, {Component} from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import jsonData from '../carousel_data.json';

// function that maps all images into an array of images for JSX use
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images["imgs/"+item.replace('./', '')] = r(item); });
    return images;
}

// array that contains all images
const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg|gif)$/));

class App extends Component{
    
    constructor(){
        super();
        this.data = {};
        this.state = {
            data: jsonData.data
        };
    }

    getData(){
        this.setState({
            data: jsonData.data
        });
    }

    render(){
        return(
            <div id="carousel-container">
                <Carousel 
                    data={this.state.data.carousel}
                />
            </div>
        );
    }
}

class Carousel extends Component{
    constructor(){
        super();
        this.state = {
            page: 1
        };
        this.maxPage = 0;
    }

    handleClick(e, value){
        const page = this.state.page;
        if(value === "Prev"){
            if(page > 1){ // check if page is > 1 to know if current page is not the first page
                this.setState({
                    page: page - 1
                });
            }else{
                alert("Already at first page");
            }
        }else if(value === "Next"){
            if(page < this.maxPage){ // check if page is not yet the last page
                this.setState({
                    page: page + 1
                });
            }else{
                alert("Already at last page");
            }
        }else{
            // update page state to rerender carousel with the new items based on the chosen page
            this.setState({
                page: value
            });
        }
    }

    render(){
        const mainData = this.props.data ? this.props.data : {format:{img_per_page: 0, title:""}, items: []};
        const itemPerPage = mainData.format.img_per_page;
        const title = mainData.format.title;
        const rawItems = this.props.data.items.length ? mainData.items : [];
        const currentPage = this.state.page;
        let perPageTotal = itemPerPage, round = 1;
        let buttonsArray = ["Prev", round]; // create array for buttons starting with Prev and the first page
        let filteredItems = [];

        // group items into per page by how much can be
        // stored per page
        rawItems.forEach((item, key) => {
            let iterator = key + 1;
            if(!filteredItems[round]) filteredItems[round] = [];
            if(iterator > perPageTotal){
                round++;
                buttonsArray.push(round); // every new page must be pushed into buttons array
                if(!filteredItems[round]) filteredItems[round] = [];
                perPageTotal *= 2;
            }
            filteredItems[round].push(item);
        });

        // set the max page after all items have been looped thru
        this.maxPage = filteredItems.length - 1;

        // push the last button containing next
        buttonsArray.push("Next");

        // map items of current page into an array of Item JSX objects
        const items = filteredItems[currentPage].length ? filteredItems[currentPage].map((item, key) => {
            return(
                <Item
                    url={item.url}
                    img={item.img}
                    alt={item.alt}
                    title={item.title}
                    content={item.content}
                    key={key}
                />
            );
        }) : [];

        // map buttons into an array of Button JSX objects
        const buttons = buttonsArray.length ? buttonsArray.map((value, key) => {
            return(
                <Button
                    value={value}
                    currentPage={currentPage}
                    key={key}
                    onClick={(e) => this.handleClick(e, value)}
                />
            );
        }) : [];

        // render carousel with title and buttons
        return(
            <div id="carousel">
                <div className="carousel-header">
                    <h1>{title}</h1>
                </div>
                <div className="carousel-items">
                    {items}
                </div>
                <div className="carousel-buttons">
                    {buttons}
                </div>
            </div>
        );
    }
}

function Button(props){
    const currentPage = props.currentPage;
    let value = props.value, isCurrent;
    // set current page button class to active
    let icon = value;
    if((value) === currentPage) icon += " active";
    return(
        <a href="#" className={isCurrent} onClick={props.onClick}>
            <img className={icon} src={images["imgs/sprite.png"]} alt="ASD" width="35" height="35"/>
        </a>
    );
}

function Item(props){
    const url = props.url.length ? props.url : "";
    const img = props.img.length ? props.img : "";
    const alt = props.alt.length ? props.alt : "No Alt";
    const title = props.title.length ? props.title : "No Title";
    const content = props.title.length ? props.content : "No Content";
    return(
        <div className="carousel-item">
            <a href={url}>
                <img className="carousel-img" src={images[img]} alt={alt}/>
            </a>
            <a href={url}>{title}</a>
            <p>{content}</p>
        </div>
    );
}

export default App;
