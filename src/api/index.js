import axios from 'axios';

const url = "https://covid19.mathdro.id/api";
export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl=`${url}/countries/${country}`
    }
    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        return {
            confirmed, //same as confirmed:confirmed
            recovered,
            deaths,
            lastUpdate
        };
    } catch (error) {

    }
}
export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        const relevantData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
        return relevantData;
    } catch (error) {

    }
};

export const fetchCountries = async ()=>{
    try{
     const {data:{countries}} = await axios.get(`${url}/countries`);
     return countries.map((c)=>c.name);
    }catch(e){

    }
}
