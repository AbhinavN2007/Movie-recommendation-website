const OMDB_KEY=window.CONFIG.OMDB_KEY;
const GEMINI_KEY=window.CONFIG.GEMINI_KEY;
function mainSearch(){
    const inputElement = document.getElementById('main-input');
    fetchData(inputElement.value);

}
async function fetchData(movieinput) {

    
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
        anchortag.href=`redirected.html?item=${data.Title}`

    })

}

function redirectedPage(){
    const urlParams= new URLSearchParams(window.location.search);
    const newMovie=urlParams.get('item');
    fetchData(newMovie);
}

if (new URLSearchParams(window.location.search).has('item')) {
    redirectedPage();   
}

async function smartSearch(){

    const inputElement=document.getElementById('smart-input');
    const inputPrompt=inputElement.value;
    const prompt=`I will give you a prompt, recommend four movies or series based on the prompt i give you.The response should be a simple string with no extra text but the sequence of movie or series names separated by a single |. Here is the prompt ${inputPrompt}`;
    try{
        document.getElementById('smart-rec-title').innerHTML='Here are some movies you might like based on your search.';
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
    catch(error){
                console.error('Error:', error);
            }
        }
    


