import React, { Component } from 'react'

export default class Fav extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = []
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]]))
            {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift("All Genres")
        // console.log(temp);
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }

    handleGenreChange=(genre)=>{
        this.setState({
            currgen:genre
        })
    }
    handlePopularityAsc=()=>
    {
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatingDesc=()=>
    {
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average 
        })
        this.setState({
            movies:[...temp]
        })
    }

    handlePopularityDesc=()=>
    {
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatingAsc=()=>
    {
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePagechange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDeleteMovie=(movie)=>{
        let newArr=[];
        newArr=this.state.movies.filter((movieObj)=>movieObj.id!=movie.id)
        this.setState({
            movies:[...newArr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newArr))
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterArr=[]

        if(this.state.currText=='')
        {
            filterArr=this.state.movies;
        }
        else{
            filterArr=this.state.movies.filter((movieObj)=>{
                let title=movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
        }
        if(this.state.currgen!='All Genres'){
            filterArr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }

        let pages=Math.ceil(filterArr.length/this.state.limit)

        let pageArr=[];
        for(let i=1;i<=pages;i++)
            pageArr.push(i);

        let si=(this.state.currPage-1)*this.state.limit;
        let ei=si+this.state.limit;
        filterArr=filterArr.slice(si,ei);

        
        return (
            <>
                <div className="main">
                    <div className="rows">
                        <div className="col-lg-3 col-sm-12">
                            <ul className='list-group favourites-genres'>
                                {
                                    this.state.genres.map((genre)=>(
                                        this.state.currgen===genre?
                                        <li className="list-group-item" style={{backgroundColor:'blue',color:'white', fontWeight:'bold'}}>{genre}</li>:
                                        <li className="list-group-item" style={{backgroundColor:'white',color:'blue'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                                    ))
                                }

                            </ul>
                        </div>
                        <div className="col-lg-9 favourites-table col-sm-12">
                            <div className="row">
                                <input type="text" className='input-group-text col-9' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                                <input type="number" className='input-group-text col-3' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-caret-up" onClick={this.handlePopularityAsc}></i> Popularity<i class="fas fa-caret-down" onClick={this.handlePopularityDesc}></i></th>
                                            <th scope="col"><i class="fas fa-caret-up" onClick={this.handleRatingAsc}></i> Rating<i class="fas fa-caret-down" onClick={this.handleRatingDesc}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj) => (
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} /> {movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button className="btn btn-danger" onClick={()=>this.handleDeleteMovie(movieObj)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="page" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                                    <nav aria-label="Page navigation example " >
                                        <ul className="pagination">
                                            {
                                                pageArr.map((page)=>(
                                                    <li className="page-item"><a className="page-link" onClick={()=>this.handlePagechange(page)}>{page}</a></li>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
