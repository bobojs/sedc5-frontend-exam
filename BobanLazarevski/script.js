let createBook = $("#createBook");
let save = $("#saveBook");
let library = $("#library");
let resultTable = $(".result_table");
let novelsTable = $(".novels_table");
let anthologyTable = $(".anthology_table");
let body = $("body");
let i = 0;
let pageNumber = 1;
let pageSize = 5;
let arrayOfBooks = [];
let updateArray = [];
   	library.show();
let tbodyResult = $(".result_tbody");


$("#predefinedPublishersNovel").on("change",()=>{
		let predefinedPublishersNovel = $("#predefinedPublishersNovel option:selected").val();
		$("#publisherOfNovel_Id").val(predefinedPublishersNovel);
})
$("#predefinedPublishersAnthologies").on("change",()=>{
		let predefinedPublishersAnthologies = $("#predefinedPublishersAnthologies option:selected").val();
		$("#publisherOfAnthologi_Id").val(predefinedPublishersAnthologies);
})

$("#series_Id").on("keyup",()=>{
	if($("#series_Id").val() != ""){
	$("#thSeriesNumberHidden").show();
	$("#tdSeriesNumberHidden").show();
	}
	else 
	{
	$("#thSeriesNumberHidden").hide();
	$("#tdSeriesNumberHidden").hide();
	}

})


$(".selected").on("change",()=>{
	let selected = $(".selected").val();

	if(selected == "Novels"){
		novelsTable.toggle();
		anthologyTable.hide();
		save.show();
	}
	else if(selected == "Anthologies"){
		anthologyTable.toggle();
		novelsTable.hide();
		save.show();
	}
})

function NovelBook(title,author,publisher,yearOfPublication,lengthInPages,
	series,seriesNumber,isbnNovel,reviewNovel){

	this.title = title;
	this.author = author;
	this.publisher = publisher;
	this.yearOfPublication = yearOfPublication;
	this.lengthInPages = lengthInPages;
	this.series = series;
	this.seriesNumber = seriesNumber;
	this.isbnNovel = isbnNovel;
	this.reviewNovel = reviewNovel;
}

function AnthologyBook(title,editor,publisher,yearOfPublication,
	lengthInPages,storiesIncluded,isbnAnthology,reviewAnthology){

	this.title = title;
	this.editor = editor;
	this.publisher = publisher;
	this.yearOfPublication = yearOfPublication;
	this.lengthInPages = lengthInPages;
	this.storiesIncluded = storiesIncluded;
	this.isbnAnthology = isbnAnthology;
	this.reviewAnthology = reviewAnthology;
}



let displayPage = (pageNumber,pageSize)=>{
		console.log(arrayOfBooks);
        let startIndex = (pageNumber-1) * pageSize;

      	let endIndex = pageNumber * pageSize;

      	updateArray = arrayOfBooks.slice(startIndex,endIndex);
        appendBooks(pageNumber,pageSize,updateArray);
   }
   $("#previous").on("click",()=>{
   	  pageNumber > 1 ? pageNumber-- : -1
   	  displayPage(pageNumber,pageSize,updateArray);
   })

   $("#next").on("click",()=>{
   	  let maxPageNumber = (arrayOfBooks.length / pageSize);
   	  pageNumber < maxPageNumber ? pageNumber++ : 1
   	  displayPage(pageNumber,pageSize,updateArray);

   })

   let appendBooks = (pageNumber,pageSize,updateArray)=>{
   	tbodyResult.html("");
   	for(let j = 0 ; j < updateArray.length ; j++){	
		$(".result_tbody").append(`
			<tr>
				<td></td>
				<td>${arrayOfBooks[j].title}</td>
				<td>${arrayOfBooks[j].author}</td>
				<td></td>
				<td>Published by ${arrayOfBooks[j].publisher} in ${arrayOfBooks[j].yearOfPublication}</td>
				<td>${arrayOfBooks[j].lengthInPages}</td>
				<td><i>${arrayOfBooks[j].series} (# ${arrayOfBooks[j].seriesNumber})</i></td>
				<td></td>
				<td>${arrayOfBooks[j].isbnNovel}</td>
				<td>${arrayOfBooks[j].halfReviewNovel} <button id="showFull">(...)</button></td>
				<td id="fullReview" class="hide">${arrayOfBooks[j].reviewNovel}</td>
				<td><button id="delete">Delete</button></td>
			</tr>

			`);
	   		}
   }

let addNovelBooks = (a)=>{
	let title = $("#titleOfNovel_Id").val();
	let author = $("#authorOfNovel_Id").val();
	let publisher = $("#publisherOfNovel_Id").val();
	let yearOfPublication = $("#yearOfPublication_Novel_Id").val();
	let lengthInPages = $("#lengthInPages_Novel_Id").val();
	let series = $("#series_Id").val();
	let seriesNumber = $("#seriesNumber_Novel_Id").val();
	let isbnNovel = $("#isbn_Novel_Id").val();
	let reviewNovel = $("#review_Novel_Id").val();
	let halfReviewNovel = reviewNovel.slice(0,47,reviewNovel.length);

	let array = [];

	var date = new Date();
	var currentYear = date.getFullYear();

	let book = new NovelBook(title,author,publisher,yearOfPublication,lengthInPages,
		series,seriesNumber,isbnNovel,reviewNovel,halfReviewNovel);
	arrayOfBooks.push(book);
	
	// if(!(yearOfPublication > 1900 && yearOfPublication < currentYear))
	// 	return alert("Year is not valid");
	// if(!(lengthInPages > 1 && lengthInPages <= 1000))
	// 	return alert("Length of pages is not valid");
	// if(isbnNovel.length != 13)
	// 	return alert("Not valid ISBN");
	if(title.lenth > 15)
		return alert("Long Title");
	if(author.length > 15)
		return alert("Long Author");
	if(publisher.length > 30)
		return alert("Long Publisher");
	if(reviewNovel.length > 50)
		array = `${halfReviewNovel} <button id="showFull">(...)</button>`;
	
	else
		array = reviewNovel;
	
	document.addEventListener('click',function(e){
	if(e.target && e.target.id == "showFull"){

		$(this).find('button:focus').parent().parent().find("#fullReview").show();
		$(this).find('button:focus').parent().hide();
	}

})
	var isbnString = "" + isbnNovel;


	
	// $(".result_tbody").append(`
	// 	<tr>
	// 		<td>${i= i+1}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].title}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].author}</td>
	// 		<td></td>
	// 		<td>Published by ${arrayOfBooks[arrayOfBooks.length - 1].publisher} in ${arrayOfBooks[arrayOfBooks.length - 1].yearOfPublication}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].lengthInPages}</td>
	// 		<td><i>${arrayOfBooks[arrayOfBooks.length - 1].series} (# ${arrayOfBooks[arrayOfBooks.length - 1].seriesNumber})</i></td>
	// 		<td></td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].isbnNovel}</td>
	// 		<td>${array}</td>
	// 		<td id="fullReview" class="hide">${reviewNovel}</td>
	// 		<td><button id="delete">Delete</button></td>
	// 	</tr>

	// 	`)
	displayPage(pageNumber,pageSize,updateArray);
}


let addAnthologyBooks = (a)=>{
	let title = $("#titleOfAnthology_Id").val();
	let editor = $("#editorOfAnthology_Id").val();
	let publisher = $("#publisherOfAnthology_Id").val();
	let yearOfPublication = $("#yearOfPublication_Anthology_Id").val();
	let lengthInPages = $("#lengthInPages_Anthology_Id").val();
	let storiesIncluded = $("#storiesIncluded_Id").val();
	let isbnAnthology = $("#isbn_Anthology_Id").val();
	let reviewAnthology = $("#review_Anthology_Id").val();

	let book = new AnthologyBook(title,editor,publisher,yearOfPublication,
	lengthInPages,storiesIncluded,isbnAnthology,reviewAnthology);
	arrayOfBooks.push(book);
	// console.log(arrayOfBooks);
	// $(".result_tbody").append(`
	// 	<tr>
	// 		<td>${i= i+1}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].title}</td>
	// 		<td></td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].editor}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].publisher}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].yearOfPublication}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].lengthInPages}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].storiesIncluded}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].isbnAnthology}</td>
	// 		<td>${arrayOfBooks[arrayOfBooks.length - 1].reviewAnthology}</td>
	// 		<td><button id="delete">Delete</button></td>
	// 	</tr>

	// 	`)
	displayPage(pageNumber,pageSize,updateArray);


}

save.on("click",()=>{
	let selected = $(".selected").val();
	if(selected == "Novels"){
		addNovelBooks();
		
	}
	else if(selected == "Anthologies"){
		addAnthologyBooks();
	}
})

library.on("click",()=>{
	resultTable.toggle();
	novelsTable.hide();
})

document.addEventListener("click",function(e){
	if(e.target && e.target.id == "delete"){
	$("#deleteConfirm").show();

	var a = $(this).find('button:focus').parent().parent();

	$("#confirmDelete").on("click",()=>{
	a.remove();
	$("#deleteConfirm").hide();

	})

	$("#declineDelete").on("click",()=>{
	$("#deleteConfirm").hide();

	})
	}
})