#pragma strict
var count:float = 0;
function Start () {

}

function Update () {

count++;

if(count == 10)
{
	Destroy(gameObject);
}
}