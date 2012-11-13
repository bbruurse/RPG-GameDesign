#pragma strict


var bullet:Rigidbody;
var power:float;
//var moveSpeed:float;

function Start () {

}

function Update () 
{
	if(Input.GetButtonUp("Fire1"))
	{
		var instance:Rigidbody = Instantiate(bullet,transform.position,transform.rotation);
		var fwd:Vector3 = transform.TransformDirection(Vector3.forward);
		instance.AddForce(fwd*power);
	}
}