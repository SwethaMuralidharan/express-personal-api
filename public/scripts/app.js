console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  var $p_id;
$("#addProject").fadeOut();
  $('ul.nav li').click(function(){
    console.log("event fired");
    console.log($(this));
   $(this).addClass('active');
   $(this).siblings().removeClass('active');

   if(($(this).context.textContent)=="About")
   {
     $("#addProject").fadeOut();
     console.log("About section");
     //about section
     $.ajax({
       method:"GET",
       url:'/api/profile',
       success:function(data){
         renderAbout(data);
       },
       error: function(err){
         console.log("ajax call failed for About Section",err);
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
             <p class="p_spacing"> Name : ${data[0].name} </p>
             <p class="p_spacing"> GitHub UserName: ${data[0].githubUserName} </p>
             <p class="p_spacing"> GitHub Link: <a href="${data[0].gitHubLink}"> Click Here! </a> </p>
             <p class="p_spacing"> Current City : ${data[0].currentcity} </p>
             <p class="p_spacing"> Hobbies : ${data[0].hobbies} </p>
           </div>
           </div>
         `
       );
     }
   }
   else if(($(this).context.textContent)==="My Work")
   {
     //projects section

     $("#addProject").fadeIn();
     console.log("Projects section");
     $.ajax({
       method:"GET",
       url:'/api/profile/projects',
       success:function(data){
         console.log(data);
         $p_id=data[0]._id;
         console.log($p_id);
         $("#results").empty();

         console.log(data[0].projects.length);
         renderAllProjects(data);

       },
       error: function(err){
         console.log("ajax call failed for My Work",err);
       }
     })
   }
   if(($(this).context.textContent)==="Contact")
   {
     //contact section
   }
   if(($(this).context.textContent)==="Vacation")
   {
     //vacation destination section
   }
   function renderAllProjects(data){
     for(i=0;i<data[0].projects.length;i++){
     $("#results").append(
         ` <div class="row">
           <div class="col-md-12 content-div">
             <p> <h3> Title : ${data[0].projects[i].name}</h3> </p>
             <p> <h3> Description :</h3> <h4> ${data[0].projects[i].description} <h4> </p>
             <p> <h4> <a href="${data[0].projects[i].project_url}"> Click Here for Project URL! </a>  </h4> </p>
             <p> <h4> <a href="${data[0].projects[i].image_url}" > Screenshot </a> </h4>  </p>
             <hr>
           </div>
           </div>
      `)
    }
   }

  });
  $('#form1').submit(function(){
    var url_link=`/api/profile/${$p_id}/projects`;
    alert(url_link);
    var data=$(this).serialize();
alert(data);
  $.ajax({
    method:'POST',
    url:url_link,
    success:SaveNewProject,
    data:data,
    error:function(err){
      if(err){
        console.log("Error in posting new project",err)
      }
    }
  })
  });
  function SaveNewProject(data){
    alert("Saved Successfully");

  }

});
