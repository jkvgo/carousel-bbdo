import React, {Component} from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import jsonData from '../carousel_data.json';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images["imgs/"+item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg|gif)$/));

// <img src={images['doggy.png']} />

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
                <h1>Sample Carousel</h1>
                <Carousel 
                    data={this.state.data.carousel}
                />
            </div>
        );
    }
}

class Carousel extends Component{
    render(){
        const mainData = this.props.data ? this.props.data : {format:{img_per_page: 0, title:""}, items: []};
        const itemPerPage = mainData.format.img_per_page;
        const title = mainData.format.title;
        const items = this.props.data.items.length ? mainData.items.map((item, key) => {
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

        return(
            <div id="carousel">
                {items}
            </div>
        );
    }
}

function Item(props){
    const url = props.url.length ? props.url : "";
    const img = props.img.length ? props.img : "";
    const alt = props.alt.length ? props.alt : "No Alt";
    const title = props.title.length ? props.title : "No Title";
    const content = props.title.length ? props.content : "No Content";
    return(
        <div className="carousel-item">
            <img className="carousel-img" src={images[img]} alt={alt}/>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    );
}

export default App;
