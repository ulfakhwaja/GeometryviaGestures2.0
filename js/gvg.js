var slice_flag=false;
var final_degree=0.01;
var task2_index=200;
var activity2_index=0.02;
var activity1_index=0.02;
var viewer;
var canvas;
var body;
var viewerSettings = {
		cameraEyePosition : [-2.0, -1.5, 1.0],
		cameraCenterPosition : [0.0, 0.0, 0.0],
		cameraUpVector : [0.0, 0.0, 1.0]
};

initialiseCanvas=function(id,task){
	if(task=="task3"){
		viewerSettings = {
			cameraEyePosition : [-2.0, -1.5, 0.3],
			cameraCenterPosition : [0.0, 0.0, 0.6],
			cameraUpVector : [0.0, 0.0, 1.0]
		};	
	}
	viewer = new JSM.ThreeViewer ();
	canvas = document.getElementById (id);
	//canvas.width = document.body.clientWidth;
	//canvas.height = document.body.clientHeight;
	viewer.Start (canvas, viewerSettings);
	viewer.navigation.EnableZoom (false);
}

createRectangle=function(){

	body = new JSM.Body ();			
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.55, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.55, 0.0, -1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, -1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	return body;

}

rotate=function(direction){
	var transformation;
	if(direction=="right"){
		for(degree = final_degree; degree < final_degree+0.02; degree+=0.002){
			transformation = JSM.RotationZTransformation (degree,new JSM.Coord (0,0,0));
			body.Transform (transformation);
			AddBodyToViewer (body);
		}
	} 
	final_degree=degree;
}

createCircle = function(){
	AddBodyToViewer(new JSM.GenerateCuboid(1.0,1.0,1.0));

}

AddBodyToViewer=function(body)
{
	var meshes;
	meshes = JSM.ConvertBodyToThreeMeshes (body);
	viewer.AddMeshes (meshes);	
	viewer.Draw();		
}
removeMeshes=function(){
	viewer.RemoveMeshes ();
}

slice=function(){
	initialiseCanvas("example");
	var cylinderBody = JSM.GenerateCylinder (0.5, 1,100,true, false);
	var cutBody=JSM.GenerateCuboid(1,0.05,1);
	var newBody=JSM.BooleanOperation("Difference",cylinderBody,cutBody);
	AddBodyToViewer(newBody);
	slice_flag=true;
}

smash=function(direction){
	removeMeshes();
	if(direction=="right") 
		task2_index-=40;
	else
		task2_index+=40;
	var pie1 = JSM.GeneratePie(0.5,1,task2_index* JSM.DegRad,500,true,true);
	var pie2 = JSM.GeneratePie(0.5,1,task2_index* JSM.DegRad,500,true,true);
	var transformation = new JSM.Transformation ();
	transformation = JSM.RotationZTransformation (180* JSM.DegRad,new JSM.Coord (0,0,0));
	pie1.Transform (transformation);
	AddBodyToViewer(pie1);
	AddBodyToViewer(pie2);
}

stackCylinder=function(){
	var cylinderBody = JSM.GenerateCylinder (0.5, 0.01,100,true, false);
	var addition = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, activity2_index));
	var transformation = new JSM.Transformation ();
	transformation.Append (addition);
	cylinderBody.Transform (transformation);
	AddBodyToViewer(cylinderBody);
	activity2_index+=0.02;
}

stackCuboid=function(){
	var cuboidBody = new JSM.GenerateCuboid (1, 1, 0.01);
	var addition = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, activity1_index));
	var transformation = new JSM.Transformation ();
	transformation.Append (addition);
	cuboidBody.Transform (transformation);
	AddBodyToViewer(cuboidBody);
	activity1_index+=0.02;
}
unstack=function(){
	var cylinderBody = JSM.GenerateCylinder (0.5, 0.04,100,true, false);
	var addition = JSM.TranslationTransformation (new JSM.Coord (0.0, 0.0, activity2_index));
	var transformation = new JSM.Transformation ();
	transformation.Append (addition);
	cylinderBody.Transform (transformation);
	AddBodyToViewer(cylinderBody);
	activity2_index-=0.05;
}
