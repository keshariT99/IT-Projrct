import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Admin extends Component{

    constructor(props){

        super(props);
 
        this.state={
 
            adminpackages:[] //initialize array
        };
 
    }
 
   componentDidMount(){ 
 
    this.retrivePacks();
   }
   retrivePacks(){
 
    axios.get("http://localhost:8060/adminpackage/packs").then(res=>{
 
       if(res.data.success){
           this.setState({
 
            adminpackages:res.data.existingPack
 
           });
 
           console.log(this.state.adminpackages)
 
       }
 
 
       
   
    });
  
 
   }
 
  
 
 
   onDelete = (id) =>{
     axios.delete(`http://localhost:8060/adminpackage/pack/delete/${id}`).then((res)=>{ //code if successfull - promises
       alert("Delete Successfull");
       this.retrivePacks();
       
     })
   }
 
 ///Filter /Search Mechod
 filterContent(adminpackages,searchTerm){
 
   const results=adminpackages.filter((AdminPackage)=>AdminPackage.package_type.toLowerCase().includes(searchTerm));
   this.setState({adminpackages:results});
 //'this' references the object that is executing the current function.
 }
 
 
 
 handleTextSearch=(e)=>{
 
    const searchTerm=e.currentTarget.value;
    axios.get("http://localhost:8060/adminpackage/packs").then(res=>{
 
     if(res.data.success){
        this.filterContent(res.data.existingPack,searchTerm)
     }
 });
 
 };
 
   
  render(){  /*display the specified HTML code inside the specified HTML element. 
    In the render() method, we can read props and state and return our JSX code to the root component of our app.*/
 
   const myStyle={
     backgroundImage: 
 "url('./admin.jpg')",
     height:'30vh',
     width:'2850px',
     marginTop:'-130px',
     marginLeft:'-50PX',
     fontSize:'50px',
     backgroundSize: '50%',
     backgroundRepeat: 'no-repeat',
 };
 
     return(
       
       <div className="container">
 <div style={myStyle}>
 <div className="row" style={{marginTop:-60, marginBottom:50, marginLeft:'200px'}}>
          <div className="col-lg-9 mt-2 mb-2 text-secondary" style={{marginLeft:'190px'}}>
             <h1><strong>Search your Package type here</strong>-</h1>
             
   
          </div>
          
          <div className="col-lg-3 mt-2 mb-2" class="text-center">
             
           
                <input
                 className="form-control"
                 type="search"
                 placeholder="Search"
                 name="searchTerm"
                 onChange={this.handleTextSearch}
                 style={{width:'600px', marginLeft:'200px'}}
                
                ></input>
 </div>
 </div>
 </div>
       <div>
 
       <h3 aligh="center" style={{marginTop:30}}>Request Tour Package List</h3>
       <table className="table  table-hover table-secondary" style={{marginTop:37}}>
       <thead class="thead-light" style={{width:'500px'}} >
       <tr >
            <th scope="col" style={{width:'90px'}}>Package ID</th>
            <th scope="col"style={{width:'120px'}}>Package Type</th>
            <th scope="col">Package Name</th>
            <th scope="col">Day_Range</th>
            <th scope="col" style={{width:'120px'}}>Price_Range</th>
            <th scope="col" >Other_Details</th>
            
            <th colSpan="1" style={{width:'135px'}}> Action</th>
            <th scope="col"style={{width:'50px'}}></th>  
   
   
       </tr>
      </thead>
      <tbody style={{height:'55px'}}>
      {this.state.adminpackages.map((adminpackages) =>(
                       
                       <tr className="table-info"> {/*key={index}>
      <th scope="row">{index+1}</th>*/}
 
 
                         <td> 
                             <a href={`/package/${adminpackages._id}`} style={{textDecoration:'none'}}>
                              {adminpackages.package_id}
                              </a>
                              </td>
                         <td>{adminpackages.package_type}</td>
                         <td>{adminpackages.package_name}</td>
                         <td>{adminpackages.day_range}</td>
                         <td>{adminpackages.price_range}</td>
                         <td>{adminpackages.other_details}</td>
                       
 
                       <td>
                         <a className="btn btn-warning btn-md" href='' style={{margin:'0px 0px 0px -30px', height:'35px'}}>
                           <i className="fas fa-edit"></i>&nbsp;Confirm
                         </a></td>
                         <td></td>
                         <td>
                        &nbsp;
                         <a className="btn btn-danger" href="#" onClick={() => this.onDelete(adminpackages._id)} style={{margin:'0px 0px 0px -100px', height:'35px'}}>
                           <i className="far fa-trash-alt"></i>&nbsp;Reject
                         </a>
                       </td>
                        
 
 
                       </tr>
 
                      ))}
                     
 
                      
                      
 
           
                      </tbody>
 
      
   
       
   
      
      </table>

      <h2>If you want to get report</h2>
      <Link to="/PDF">
          
                        <button type="button" className="btn btn-md btn-warning" style={{textDecoration:'none',  marginRight:'600px' , width:'150px', marginTop:'30px'}}><i className="fa fa-wpforms"></i>  Let's go  </button>
                    </Link>
       </div>
 
     </div>
 
 
     )
 
 
  }
}