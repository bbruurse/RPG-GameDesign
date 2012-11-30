#pragma strict


var player : Transform;  // the object that will be chased

public var viewFieldRadius : float = 20.0;  // the field of view radius the character will look
public var viewRange : float = 150.0;  // the distance within the Field Radius 

public var rotationSpeed : float = 10.0;  // correction factor for smoothing the path


enum DragonState {Looking, Attacking}   // two states the objects can be in
private var currentState : DragonState;  

 public var soundOnSpotted : AudioClip; //object sound
 private var hasSounded: boolean = false;
 
 private var shootCounter : int = 0;
 var bullet:Rigidbody;
var power:float;


function Start () {
	currentState = DragonState.Looking;   
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
      
        case DragonState.Looking: 
        	hasSounded = false;
            if(isTargetVisible()) currentState = DragonState.Attacking; 
            break; 
      
        case DragonState.Attacking:      
            turnTowardTarget(); 
            shootCounter++;
            if(shootCounter == 100){
            	shootCounter =0;

            	var x = transform.position.x;
				var y = transform.position.y;
				var z = transform.position.z;
				var mouth = new Vector3(x,y,z);
				
            	var instance:Rigidbody = Instantiate(bullet, mouth, transform.rotation);
				var fwd:Vector3 = transform.TransformDirection(Vector3.forward);
				instance.AddForce(10*fwd*power);
            }
            if(!isTargetVisible()) currentState = DragonState.Looking; 
            break; 
   } 
}

function turnTowardTarget():void{ 
    var direction : Vector3 = player.position - transform.position;  
    direction.y = 0;
    
    // slowly rotate the object toward the target for smooth path
   // transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);    
   
}