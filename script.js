const OMDB_KEY=window.CONFIG.OMDB_KEY;    //Defining api-keys
const GEMINI_KEY=window.CONFIG.GEMINI_KEY;
const TMDB_KEY=window.CONFIG.TMDB_KEY;

//Main Search field on home page
function mainSearch(){
    const inputElement = document.getElementById('main-input');
    fetchData(inputElement.value);
}

//General function for retrieving data on a movie using OMDB api when the movie name is passed in
async function fetchData(movieinput) {
    //Using OMDB api to fetch necessary details
 
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieinput)}&apikey=${OMDB_KEY}`;
    try{
        const response=await fetch(apiUrl);
        const data=await response.json();
        const outputElement1 = document.getElementById('output');
        const outputElement2 = document.getElementById('output-image');
        if (data.Response == 'False') {
            if (outputElement1) {
                outputElement1.textContent = 'There is no data on the entered movie.';
            }
            if (outputElement2) {
                outputElement2.style = "display:none;";

            }
            throw new Error('Data not found');
        }
        else {
            const movieTitle = data.Title;
            const movieIMDB = data.imdbRating;
            const imagelink = data.Poster;
            const moviedesc = data.Plot;
            const Actors = data.Actors;

            if (outputElement1) {
                outputElement1.innerHTML = `<h2 class="text-primary">${movieTitle}</h2><br>
                                        <h5>IMDB rating: ${movieIMDB}.</h4>
                                        <h5>Starring: ${Actors}.</h5><br>
                                        <p font-family="Roboto">${moviedesc}</p>                                        
                                        `;
            }
            if (outputElement2) {
                outputElement2.src = imagelink
                outputElement2.style = "display:block;"
            }
            const outputRecTitle=document.getElementById("Rec_Title")
            outputRecTitle.innerHTML="More Like this-"

            //Prompt gemini to provide the names of the similar movies to the movie passed in
            const prompt=`Provide 4 movies or series similar to ${movieTitle}.The output should be a simple text only containing the names of the four movies separated by | without anything else.`
            const geminiResponse=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_KEY}`,{
                method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
                const recData=await geminiResponse.json();
                const recString=recData.candidates[0].content.parts[0].text;
                const recArray=recString.split('|')
                console.log(recArray)
                
                for(let i=0;i<4;i++){
                    fetchRecData(i,recArray[i])
                }
            
        }        
        }        
        catch(error){
            console.error('Error:', error);
        }}


//Using OMDB again to retrieve data on each of the movies recommended by Gemini.
async function fetchRecData(i,movieTitle){
    const outputElement1=document.getElementById(`rec-img${i}`)
    const outputElement2=document.getElementById(`rec-name${i}`)
    const anchortag=document.getElementById(`reca-name${i}`)

    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${OMDB_KEY}`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{
        outputElement1.src=data.Poster
        outputElement1.alt="Image Unavailable"
        outputElement1.style="display:block;"
        outputElement2.innerHTML=data.Title
        anchortag.href=`redirected.html?item=${data.Title}` //Modifying query string of URL to redirect to page containing this movie's info(achirved using Redirected Page Function)

    })
}

//Function to display the movie name, along with necessary data, and similar movies using the two functions above, in the redirected page.
//The movie name is transferred using URLSearchParams function
function redirectedPage(){
    const urlParams= new URLSearchParams(window.location.search);
    const newMovie=urlParams.get('item');
    fetchData(newMovie);
}
//Done to automatically run redirectedPage function when on a redirected page as identified by item attribute of the modified URL(query string is modified)
if (new URLSearchParams(window.location.search).has('item')) {
    redirectedPage();   
}


//Function invoked when search button on smart search field is clicked.
async function smartSearch(){

    const inputElement=document.getElementById('smart-input');
    const inputPrompt=inputElement.value;
    //Prompting Gemini to recommend movies based on user input.
    const prompt=`I will give you a prompt, recommend four movies or series based on the prompt i give you.The response should be a simple string with no extra text but the sequence of movie or series names separated by a single |. Here is the prompt ${inputPrompt}`;
    try{
        document.getElementById('smart-rec-title').innerHTML='Here are some movies you might like based on your search-';
        const geminiResponse=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_KEY}`,{
                method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
                const recData=await geminiResponse.json();
                const recString=recData.candidates[0].content.parts[0].text;
                const recArray=recString.split('|')
                console.log(recArray)
                //Reusing fetchRecData function to get same functionality as before(fetchRecData uses OMDB api again)
                for(let i=0;i<4;i++){
                    fetchRecData(i,recArray[i])
                }
        }        
    catch(error){
                console.error('Error:', error);
            }
        }

//Run trending function to fetch trending movies from TMDB api.        
if (window.location.pathname.includes('trending.html')) {
    trending();
}

//Fetching data of trending movies and surrounding data using TMDB api
async function trending(){
    try{
        document.getElementById('trending-title').innerHTML='Trending-'
        
        const tmdbresponse=await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_KEY}`);
        pre_data=await tmdbresponse.json();

        ;
        for(let i=0;i<8;i++){
            data=pre_data.results[i]
            const ouputImageLink=document.getElementById(`tra-name${i}`)
            const outputImage=document.getElementById(`tr-img${i}`)
            const outputTitle=document.getElementById(`tr-name${i}`)
            outputImage.style="display:block"
            outputImage.src=`https://image.tmdb.org/t/p/w500${data.poster_path}`
            //Some movies/series on TMDB have "name" attribute as a substitute for "title" for the corresponding movie name so fixing that:
            if(data.title!=undefined){
                final_title=data.title
            }
            else{
                final_title.innerHTML=data.name
            }
            outputTitle.innerHTML=final_title
            ouputImageLink.href=`redirected.html?item=${final_title}`
        }
    }
    catch(error){
        console.error('Error',error);
    }
}
    


