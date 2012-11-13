#pragma strict
var rotationSpeed:float=100.0;
function Start () {

}

function Update () {
transform.Rotate(Vector3(0,0,rotationSpeed*Time.deltaTime));
}
function OnTriggerEnter(col:Collider)
{
if(col.gameObject.tag=="Player")
{
col.gameObject.SendMessage("kitPickup");
Destroy(gameObject);

}
}