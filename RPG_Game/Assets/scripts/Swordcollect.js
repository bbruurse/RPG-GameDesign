#pragma strict
static var charge:int=0;
var collectSound:AudioClip;
var hudCharge:Texture2D[];
var chargeHudGUI:GUITexture;
function Start () {
charge=0;

}

function SwordPickup()
{
chargeHudGUI.texture=hudCharge[charge];
charge++;
//AudioSource.PlayClipAtPoint(collectSound,transform.position);
}
function Update () {

}