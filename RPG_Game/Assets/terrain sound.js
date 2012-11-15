#pragma strict
var terrainsound:AudioClip;
function Start () {

}

function Update () {
AudioSource.PlayClipAtPoint(terrainsound,transform.position);
}