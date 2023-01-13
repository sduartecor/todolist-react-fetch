import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {


	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);
	const [mensaje, setMensaje] = useState("");

	//Crear Usuario
	function crearUser(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sduartecor', {
			method: "POST",
			body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data)=>console.log(data))

	}

	//Obtengo lista del usuario
	function getList(){
	try {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sduartecor', {
			method: "GET",
    }).then((response) => response.json()).then((data)=>{console.log(data); setLista(data);});
	//
	if(lista !== ""){

		setMensaje("visually-hidden");
	} else {
		setMensaje("");
	}
	} catch(e){
	console.log(e);
	}

	}

	//Actualizo lista del usuario
    function updateList(){
		try{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/sduartecor', {
			method: "PUT",
			body: JSON.stringify(lista),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data)=>console.log(data));
} catch(e) {
	console.log(e);

}
	}

	useEffect(() => {getList()}, []);

	useEffect(() => {updateList()}, [lista]);

	function addTarea(e) {
		if(e.key==='Enter'){
			e.preventDefault();
			if(tarea == "") {
				alert("Ingresa una tarea")
			} else{
				setLista([...lista, {"label":tarea, "done":false}]); 	
				setTarea("");
				setMensaje("visually-hidden")
			}
		}
	}

	function removeTarea(id) {
		console.log(id);
		setLista(lista.filter((tarea,index) => index !== id)) ;
		if (lista.length === 1) {
			setMensaje("");
		}
	
}



	return (
		<div>
			<h1 className="text-secondary fw-light text-center mt-3" style={{fontSize: "80px"}}>todos</h1>
			<div className="container d-flex justify-content-center">

			<ul className="list-group list-group-flush shadow-lg bg-body-tertiary rounded w-50 rounded-0  fw-light">

  <li className="list-group-item" aria-current="true">
	<input className="form-control fs-5 fw-light rounded-0 border border-0 px-3" type="text" placeholder="What needs to be done?" aria-label="Disabled input example" value={tarea} onChange={(e) => setTarea(e.target.value)} onKeyDown={addTarea}   required/>
	</li>

  {lista.map((tarea, index) =>  <li  className="list-group-item fs-5 px-5" key={index}>{tarea.label} <button type="button" className="btn-close border-0 float-end" onClick={() => removeTarea(index)}></button> </li>  )} 


  <li className={"list-group-item disabled fs-5 px-5 " + mensaje} aria-disabled="true">No tasks, add a task</li>
  <li className="list-group-item disabled" aria-disabled="true">{lista.length} item left</li>
</ul>
			
			</div>
			
		</div>
	);
};

export default Home;
