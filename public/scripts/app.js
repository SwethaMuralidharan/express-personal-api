console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('ul.nav li').click(function(){
   $(this).addClass('active');
   $(this).siblings().removeClass('active');

   if(($(this).context.textContent)=="About")
   {
     console.log("About section");
     //about section
     $.ajax({
       method:"GET",
       url:'/api/profile',
       success:function(data){
         renderAbout(data);
       },
       error: function(err){
         console.log("ajax call failed",err);
       }
     })
     function renderAbout(data){
        $("#results").empty();
        $("#results").append(
         ` <div class="row">
           <div class="col-sm-4">
              <img class="imgContent" style="width:60%" src="images/Pro.jpg" >
            </div>
           <div class="col-sm-8">
             <p> Name : ${data[0].name} </p>
             <p> GitHub UserName: ${data[0].githubUserName} </p>
             <p> GitHub Link: <a href="${data[0].gitHubLink}"> Click Here! </a> </p>
             <p> Current City : ${data[0].currentcity} </p>
             <p> Hobbies : ${data[0].hobbies} </p>
           </div>
           </div>
         `
       );
     }
   }
   if(($(this).context.innerText)==="My Work")
   {
     //projects section
   }
   if(($(this).context.innerText)==="Contact")
   {
     //contact section
   }
   if(($(this).context.innerText)==="Vacation")
   {
     //vacation destination section
   }


  });

});
