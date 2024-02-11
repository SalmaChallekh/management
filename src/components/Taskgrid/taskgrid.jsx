
import { useState } from "react";
import axiosApi from "../../config/axios";
import { Link, useNavigate } from "react-router-dom"
export default ({task}) => {

    console.log(task , "task props");
    const [taskid, settaskbyid] = useState("")
    const navigate=useNavigate()
    const gettaskbyid=(id)=>{
        axiosApi.get("http://localhost:5000/tasks/"+id,{state:{id:id}})
        .then((res)=>{
            console.log(res.data.data,"task by id");
            if(res.status===200){
                navigate("/taskdetails/"+id,{state:{id:id}})
                settaskbyid(res.data.data)
            }
        })
    }
    return (
        <>
           <div className="col-lg-6 col-md-6 mb-5 ">
                                <div className="blog-item ">
                                   {/*  <img src="images/blog/4.jpg" alt className="img-fluid rounded" /> */}
                                    <div className="blog-item-content bg-white p-5">
                                        <div className="blog-item-meta bg-gray py-1 px-2">
                                            <span className="text-muted text-capitalize mr-3"><i className="ti-pencil-alt mr-2" />{task?.status?.status}</span>
                                            <span className="text-black text-capitalize mr-3"><i className="ti-time mr-1" />{task?.deadline}</span>
                                        </div>
                                        <h3 className="mt-3 mb-3"><a href="blog-single.html">{task?.name}</a></h3>
                                        <Link className="nav-link" to="/projectdetails" class="btn btn-small btn-main btn-round-full" onClick={()=>gettaskbyid(task._id)} >More Details</Link>
                                       
                                    </div>
                                </div>
                            </div>

        </>
    )
}