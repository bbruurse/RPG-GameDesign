#pragma strict

var sword:Rigidbody;
var swingSound:AudioClip;

function Start () {

}

function Update () {
if(Input.GetButtonUp("Fire1"))
	{
		//audio.volume = 1.0;
        //audio.PlayOneShot(swingSound);
        //audio.PlayOneShot(swingSound,1.0);
		swingSword();
	}
}
function swingSword()
{
	sword.animation.Play();
	audio.volume = 1.0;
	audio.PlayOneShot(swingSound);
}