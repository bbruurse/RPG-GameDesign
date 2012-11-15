#pragma strict

var waypoint : Transform[];
var speed : float = 20;
private var currentWaypoint : int;
var loop : boolean = true;
var player : Transform;
 
function Avake(){
   waypoint[0] = transform;
 
}
 
function Update () {
 
   if(currentWaypoint < waypoint.length) {
      var target : Vector3 = waypoint[currentWaypoint].position;
      var moveDirection : Vector3 = target -transform.position;
      var velocity = rigidbody.velocity;
      var distFromPlayer : Vector3 = player.position - transform.position;
 
      if(moveDirection.magnitude < 1){
      currentWaypoint++;
}
else if(distFromPlayer.magnitude < 15){
velocity = Vector3.zero;
target = player.position;
velocity =  (player.position - transform.position).normalized * speed;
if((player.position - waypoint[currentWaypoint].position).magnitude >15){
target = waypoint[currentWaypoint].position;
velocity = moveDirection.normalized * speed;
}
}
else{
   velocity = moveDirection.normalized * speed;
   }
}
else{
if(loop){
currentWaypoint=0;
   }
   else{
      velocity=Vector3.zero;
   }
}
 
velocity.y = 0;
rigidbody.velocity = velocity;
transform.LookAt(target);
}