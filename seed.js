var db=require('./models');

var profile = new db.Profile({
  name:"Swetha",
  githubUserName:"SwethaMuralidharan",
  gitHubLink:"https://github.com/SwethaMuralidharan/",
  currentcity:"Dublin,California",
  hobbies:"Cooking, Hiking, Singing",
  projects: [
   {
     name : "Memory Game",
     description: "Concentration, also known as Match Match, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs, is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards.",
     project_url : "https://github.com/SwethaMuralidharan/wdi-fundamentals-memorygame",
     image_url:"https://github.com/SwethaMuralidharan/wdi-fundamentals-memorygame/blob/master/Screen%20Shot%202017-12-02%20at%208.46.44%20PM.png"
   },
   {
     name:"Routing in Mobile Adhoc Networks(Manet) with Route Hand-off and Balanced Load",
     description:"This Project was implemented in network simulator (ns-2.35) to improve Quality Of Service in Mobile Adhoc Networks by providing link stability among mobile nodes in the network by using channel characteristics and preemptive hand-off strategy.",
     project_url:"https://www.scribd.com/document/239301498/Routing-in-Manet-With-Route-Handoff-and-Balanced-Load",
     image_url:"http://slideplayer.com/slide/8519592/26/images/13/How+to+Utilize+Location+Information:+Observation+2+(+Route+Handover+).jpg"
   },
   {
     name : "Js Control Flow",
     description:"Javascript problem statements which control flow techniques",
     project_url:"https://github.com/SwethaMuralidharan/js-control-flow-training",
     image_url:"https://i.ytimg.com/vi/phXZVneg5ow/hqdefault.jpg"
   },
   {
     name: "Js Basics Problem Set",
     description:"Javascript basics Problem Set with logical approach.",
     project_url:"https://github.com/SwethaMuralidharan/problem-set-js-basics",
     image_url:"https://achievement-images.teamtreehouse.com/badges_JavaScript_Basics_Stage1.png"
   },
   {
     name:"Tic Tac Toe",
     description: "A game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game",
     project_url:"https://github.com/SwethaMuralidharan/tic-tac-toe",
     image_url:"https://github.com/SwethaMuralidharan/tic-tac-toe/blob/master/board.png"
   },
   {
     name:"Type Racing Game",
     description:"Type faster and correctly as and when the letter appears till the bar reaches the end.",
     project_url:"https://github.com/SwethaMuralidharan/RacingGame",
     image_url:"https://github.com/SwethaMuralidharan/RacingGame"
   }
 ],
 vacation:[
   {
     place: "Colorado Springs",
     topdestinationPoints:"Pikes Peak , Garden Of the GODs, Seven Falls.",
     travelPeriod: "September 2017"
   },
   {
     place: "Lake Tahoe",
     topdestinationPoints:" The Lake Tahoe , Eagle Falls, Skiing Resorts ",
     travelPeriod: "November 2017"
   }
 ]
});

profile.save(function(err, savedprofile){
  if (err) {
    console.log(err);
    return;
  }
  console.log(savedprofile);
  process.exit();
});