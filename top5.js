const hits = {
    "google.com": 58,
    "whatever.com": 22,
    "yahoo.com": 38,
    // ...
 };
 
 const sortedHitsTuple = Object.entries(hits).sort((a, b) => a[1] - b[1]);
 
 function getTop5(hits) {
   return sortedHitsTuple.slice(-5).map(([referrer]) => referrer);
 }
 
 function getBottom5(hits) {
   return sortedHitsTuple.slice(0, 5).map(([referrer]) => referrer);  
 }