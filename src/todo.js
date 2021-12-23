import React, { useState, useEffect} from 'react';
import todo from "./todo.svg";
// import "./style.css";
import "./App.css";

// get the local data back

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists) {
        return JSON.parse(lists);
    }
    else{
        return[];
    }
}

const ToDo = () => {
    const [inputData,setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [edited, setEdited] = useState(null);


        //add items in the list
    const addItem = () => {
        if (!inputData){
            alert("please fill the data!")
        }
        else if(inputData && !toggleSubmit) {
            setItems(
                items.map((ele) => {
                    if(ele.id === edited )
                    {
                        return{... ele, name : inputData}
                    }
                    return ele;
                })
            );
            setToggleSubmit(true);
            setInputData('');
            setEdited(null);
        }
        else{
            const allInputData = { id : new Date().getTime().toString(), name: inputData };
            setItems([...items,allInputData]);
            setInputData('');
        }
        
    }

    //edit the items inside the list
    const edititem = (index) => {
        const editupdates = items.find((ele) => {
            return ele.id === index;
        })
        setToggleSubmit(false);
        setInputData(editupdates.name);
        setEdited(index);
    }


    //delete the items 
    const deleteitem = (index) => {
        const updateditems = items.filter((ele) => {
            return ele.id !== index ;
        });
        setItems(updateditems);

    }


    // remove all the list
    const removeAll = (e) => {
        setItems([]);
    }


    //set data in local storage.
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);


    return (
        <>
            <div className = "main_div">
                <div className = "child_div">

                    {/* show the img and description */}
                    <figure>
                        <img  src = {todo} alt ="todo logo" />
                        <figcaption className = "figcap">Add Your List Here 👇</figcaption>
                    </figure>

                    {/* the input and button */}
                    <div className = "addItems">
                        <input className = "todo_inp" type = "text" 
                        value = {inputData}
                        onChange = {(e) => {
                            setInputData(e.target.value)
                        }}
                        placeholder = "Add Items..." />
                        {

                            toggleSubmit ? <button className ="todo_btn" onClick = {addItem}> + </button> :
                            <button className ="todo_btn" onClick = {addItem}> edit </button>
                        }
                    </div>

                        {/* show the lists */}
                    <div className = "showItems">
                        
                            {
                                items.map((val) => {
                                    return (
                                        <div className = "eachitem" key = {val.id}>
                                            <h3>{val.name}</h3>
                                            <button className= "editbtn" onClick = { () => {edititem(val.id)} }>edit</button>
                                            <button className= "closebtn" onClick = { () => {deleteitem(val.id)} }>close</button>
                                        </div>
                                    )
                                })
                            }
                            
                            {/* the check all button */}
                        <div className = "showItems">
                            <button className = "btn_effect04"  onClick = {removeAll}><span>CHACK LIST</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToDo; 