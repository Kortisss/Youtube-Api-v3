$(document).ready(function(){
    var key = 'AIzaSyATjcRlL2tA7YlENFnpJzcbyBz6b2v9DuQ';      
    var searchURL = 'https://www.googleapis.com/youtube/v3/search';

   

loadVids();
function loadVids(){
    $("#input").keypress(function(e){
        var query = $("#input").val();         
                var select1 = document.getElementById("select1");
                var selectedSelect1 = select1.options[select1.selectedIndex].text;
                
                var select2 = document.getElementById("select2");
                var selectedSelect2 = select2.options[select2.selectedIndex].text;

                var select3 = document.getElementById("select3");
                var selectedSelect3 = select3.options[select3.selectedIndex].text;

        var byDate="https://www.googleapis.com/youtube/v3/search?part=snippet&nextPageToken="+ +"&maxResults="+selectedSelect3+"&order="+selectedSelect1+"&eventType="+selectedSelect2+"&q="+query+"&type=video&key="+key;

        if(e.which == 13){           

            console.log(results);

            $.getJSON(byDate, function(data){
                console.log(data);
                var nextToken = data.nextPageToken;
                console.log(nextToken);
                resultsLoop(data);
            })
            
        }
    });
}
    //main function
function resultsLoop(data)
{
    $("main").html("");
    $.each(data.items, function(i,item){
        var title = item.snippet.title;
        var author = item.snippet.channelTitle;
        var thumb = item.snippet.thumbnails.high.url;
        var vid = item.id.videoId;
        var date = item.snippet.publishedAt.substring(0,10);
        var minutes = item.snippet.publishedAt.substring(12,16);
        
        $('main').append(`
        <article data-key="${vid}">
            <img src="${thumb}">
            <div class="details">
                <h4>${title}</h4>
                <p>${author}</p>
                <p>${date} ${minutes}</p>
            </div>    
        </article>
        `);
        });
        $('main').append(`
        <div class="pages">
            <a href=""><img src="./img/before_white.png"></a>
            <span></span>
            <a href=""><img src="./img/next_white.png"></a>
        </div>
        `);
    }
    
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    }); 

    function mainVid(id){
        $('main').html(`
        <div class="mainVid">
                <iframe
                    src="https://www.youtube.com/embed/${id}"
                    frameborder="0" allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
        </div>
        `);
    }
});  

//opt button
$('#btn_img1').on('click',function(){

    var src = ($(this).attr("src") === "img/before_white.png")
        ? "img/next_white.png" 
        : "img/before_white.png";

    $(this).attr("src", src);

    $('.hidden_opt').toggle('slow', function(){
        $(this).toggleClass( "display" );
    });
    $('.opt_button').toggleClass( "shadows" );
});



