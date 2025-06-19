export const exerciseOptions ={
	method: 'GET',
	
	headers: {
		'x-rapidapi-key':import.meta.env.VITE_RAPID_API_KEY,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key':import.meta.env.VITE_RAPID_API_KEY,
		'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
	}
};

export const fetchData=async(URL,options)=>{
    const response=await fetch(URL,options);
    const data=await response.json();
    return data;
}