import React from "react";
import Axios from "axios";
import "./style.css";



export default class App extends React.Component{

    constructor(props){
        super(props);

        this.getCountryData =this.getCountryData.bind(this);
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    };



    componentDidMount() {

        this.getData();
    }

    async getData(){
        const resApi = await Axios.get("https://covid19.mathdro.id/api/");
        const resCountry = await Axios.get("https://covid19.mathdro.id/api/countries");

        const countries = Object.keys(resCountry.data.countries);

        this.setState({
           confirmed: resApi.data.confirmed.value,
           recovered: resApi.data.recovered.value,
           deaths: resApi.data.deaths.value,
           countries
        });
    }

    async getCountryData(e){

        if (e.target.value === "Worldwide"){

            return this.getData();
        }

        try {
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
            this.setState({
                confirmed: res.data.confirmed.value,
                recovered: res.data.recovered.value,
                deaths: res.data.deaths.value,
            })
        }catch (e) {
            if (e.response.status === 404){
                this.setState({
                   confirmed: "No data available",
                   recovered: "No data available",
                   deaths: "No data available",
                });
            }
        }
    }

    renderCountryOptions() {

        return this.state.countries.map((country, i)=> {
           return <option key={i}>{country}</option>
        });
    }

    render() {
        return(
        <div className="container">
            <div className="header">
                <h1>Health House COVID-19 tracker</h1>
            </div>


            <select className="dropdown" onChange={this.getCountryData}>
                <option>Worldwide</option>
                    {this.renderCountryOptions()}
            </select>

            <div className="flex">
            <div className="box confirmed">
                <h3>Confirmed cases</h3>
                <h4>{this.state.confirmed}</h4>
            </div>
            <div className="box recovered">
                <h3>Recovered cases</h3>
                <h4>{this.state.recovered}</h4>
            </div>
            <div className="box deaths">
                <h3>Deaths cases</h3>
                <h4>{this.state.deaths}</h4>
            </div>
            </div>

            <div className="footer">
                <footer>
                    <p>&copy;Copyright 2020, Health House</p>
                    <p>Posted by: &copy;Salazard</p>
                    <p>Contact information: <a href="mailto:dev.yann12@gmail.com">
                        dev.yann12@gmail.com</a>.</p>
                </footer>
            </div>

        </div>
        );
    }
}
