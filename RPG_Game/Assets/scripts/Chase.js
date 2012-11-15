#pragma strict

var player : Transform;  // the object that will be chased

var viewFieldRadius : float = 20.0;  // the field of view radius the character will look
var viewRange : float = 80.0;  // the distance within the Field Radius 

var moveSpeed : float = 2.0;  // speed of chase
var rotationSpeed : float = 10.0;  // correction factor for smoothing the path

var minDistance : float = 2.0;  // the distance away from the target to stop

enum AIState {Looking, Chasing}   // two states the objects can be in
private var currentState : AIState;  

 public var soundOnSpotted : AudioClip; //object sound
 private var hasSounded: boolean = false;
 
function Start () {  
    currentState = AIState.Looking;   
    if(!player) player = GameObject.Find("Player").transform; 
}

function isTargetVisible() : boolean{ 
    var direction : Vector3 = player.position - transform.position;
    var angle : float = Vector3.Angle (direction, transform.forward);
    var distance : float = direction.magnitude;
    
    // Check to see if target is inside the objects field of view
    if(distance < viewRange && angle < viewFieldRadius){
    	if(!hasSounded){
	    	audio.clip = soundOnSpotted;
			audio.Play ();
		}
		hasSounded = true;
      	return true; 
    }  	
    else{
	hasSounded = false;
    	 return false;
    }
}

function Update () { 
 
    switch(currentState){ 
      
        case AIState.Looking: 
        	hasSounded = false;
            if(isTargetVisible()) currentState = AIState.Chasing; 
            break; 
      
        case AIState.Chasing:      
            moveTowardTarget(); 
            if(!isTargetVisible()) currentState = AIState.Looking; 
            break; 
    } 
}

function moveTowardTarget():void{ 
    var direction : Vector3 = player.position - transform.position;  
    direction.y = 0;
    
    // slowly rotate the object toward the target for smooth path
    transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);    
   
    // keep moving the object toward the target until the minimum distance is achieved
    if(direction.magnitude > minDistance){      
        var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;       
        transform.position += moveVector;    
    } 
}