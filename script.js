function showCard(m){
    return `<div class="col-md-4 my-3">
                        <div class="card" >
                            <img src=${m.Poster} class="card-img-top img-fluid" alt="">
                            <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a href="#" class="btn btn-primary halo-tombol" data-bs-toggle="modal" data-bs-target="#showMovieDetails" data-imdbid="${m.imdbID}">Show details</a>
                            </div>
                        </div>
                    </div>`
}

function showDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h6>${m.Title}${m.Year}</h6> </li>
                            <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actor : </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writter : </strong> ${m.Writter}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}

const modalBody = document.querySelector(".modal-body")
console.log(modalBody)

$('.search-button').on('click',function() {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=b6c3e2ed&s=" + $('.input-keyword').val(),
        success: result => {
            const movies = result.Search;
            console.log(movies);
            let cards = ''
            movies.forEach(m => {
                cards += showCard(m)
            })
            $('.taroCard').html(cards)
            
            $('.halo-tombol').on('click', function() {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=b6c3e2ed&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetails = showDetail(m)
                        modalBody.innerHTML = movieDetails
                    },
                    error: (e) => {
                        console.log(e.responseText)
                    }
                })
            })
        },
        error: (e) => {
            console.log(e.responseText)
        }
    })

})
