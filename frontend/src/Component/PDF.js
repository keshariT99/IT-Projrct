
import React, { Component } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';

import pic44 from '../images/adminLogo.png';



export default class PDF extends Component {
   

    constructor(props){
        super(props);
        this.state={
            packages:[] //initialize array
            
        }
    
    }

   


    componentDidMount(){
        this.retrivePackages();
    }
    retrivePackages(){
  
     axios.get("http://localhost:8060/package/package").then(res=>{
  
        if(res.data.success){
            this.setState({
  
              packages:res.data.existingPackage
  
            });
  
            console.log(this.state.packages)
  
        }
  
  
        
    
     });
    }


    repotGen=()=>{

      window.print();

 }




    render(){
        
        return (
            <div>
            
            <div className="container" style={{margin:'0px 0px 0px 0px'}}>
                
                </div>
            <div className='card container' style={{width:'1600px'}}>
       <div className="container">
       <img src={pic44} style={{width:'155px' , height:'50%', marginTop:'-63px' , marginLeft:'600px'}}></img>
      
      

       <table className="table   " style={{marginTop:37}}>
      <thead class="thead-light" >
      <tr >
           <th scope="col" style={{width:'90px'}}>Package ID</th>
           <th scope="col"style={{width:'120px'}}>Package Type</th>
           <th scope="col">Package Name</th>
           <th scope="col">Day_Range</th>
           <th scope="col" style={{width:'120px'}}>Price_Range</th>
           <th scope="col" >Other_Details</th>
           
           <th scope="col"style={{width:'50px'}}></th>  
  
  
      </tr>
     </thead>
     <tbody>
     {this.state.packages.map((packages) =>(
                      
                      <tr> 


                        <td> 
                            <a href={`/package/${packages._id}`} style={{textDecoration:'none'}}>
                             {packages.package_id}
                             </a>
                             </td>
                        <td>{packages.package_type}</td>
                        <td>{packages.package_name}</td>
                        <td>{packages.day_range}</td>
                        <td>{packages.price_range}</td>
                        <td>{packages.other_details}</td>
                                         


                      </tr>

                     ))}
                    

                     
                     

          
                     </tbody>

     
  
      
  
     
     </table>


<center><button className="btn btn-dark" style={{marginTop:'-2px'}} onClick={this.repotGen} >&nbsp; Download PDF&nbsp; </button></center>
   </div>&nbsp;&nbsp;&nbsp;
   </div>
   </div>
   )
   }
}