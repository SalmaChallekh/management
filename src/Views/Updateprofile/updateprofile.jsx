import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Layouts/NavBar/navbar"
import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"

export default () => {
    const { id } = useParams()
    const [profile, setprofile] = useState({})
    const Swal = require('sweetalert2')
    const navigate = useNavigate()
    useEffect(() => {
        axiosApi.get("http://localhost:5000/users/" + id).then((res) => {
           
            setprofile(res.data.data)
            console.log(res.data.data, "data usert updarte");
        })
      
    }, [])

    const updateProfile = (e) => {

        e.preventDefault()
        console.log(id, "IDDDDDDDDD UPDATEPRO");


        axiosApi.patch(`http://localhost:5000/auth/` + id, profile)
            .then(res => {
                console.log(res.data, "data user update");


                if (res.status === 200) {
                  localStorage.setItem("user",JSON.stringify(res.data))
                    console.log("profile updated");
                    Swal.fire(
                        'Success!',
                        'profile updated Successfully',
                        'success'
                    )

                    navigate("/profile")

                }
            }).catch(err => {
                console.log(err.response, "Error update profile")
            })
    }
    return(
        <>
        <Navbar/>
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center " data-wow-delay="0.1s">
          <div className="col-6"> 
            <h4 className="section-title bg-white text-center text-color px-4"> Edit Profile</h4>
          </div>
            <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input type="text" className="form-control" id="fullName" placeholder="Fullname"
                    value={profile?.fullName}
                  
                    onChange={(e) => setprofile({ ...profile, fullName: e.target.value })}
                    />  
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input type="text" className="form-control" id="username" placeholder="username"  name='userName'
                      value={profile?.userName}
                  
                      onChange={(e) => setprofile({ ...profile, userName: e.target.value })}
                    /> 
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder="Email" name='email'
                value={profile?.email}
                  
                onChange={(e) => setprofile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="number" className="form-control" id="phone" placeholder="Phone" name='phone'
                       value={profile?.phone}
                  
                       onChange={(e) => setprofile({ ...profile, phone: e.target.value })}
                      />     
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" id="adress" placeholder="Adress" name='adress'
                         value={profile?.adress}
                  
                         onChange={(e) => setprofile({ ...profile, adress: e.target.value })}
                        />    
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" placeholder="City" name='city'
                    value={profile?.city}
                  
                    onChange={(e) => setprofile({ ...profile, city: e.target.value })}
                     />      
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="number" className="form-control" id="zipcode" placeholder="ZipCode"name='zipCode'
                     value={profile?.zipCode}
                  
                     onChange={(e) => setprofile({ ...profile, zipCode: e.target.value })}
                       />    
                  </div>
                </div>
                
                <div className="col-11">
                  <button className="btn btn-main btn-round-full" type="submit"     onClick={updateProfile}   >Save</button>
                </div>
              </div>
            </div>
             <div className="col-6">
              <div className="row justify-content-center align-items-center ml-5">
                <div>
                  <img /*  src={} */ alt className="img-fluid rounded" width="80%"  />
                </div>
              </div>
            </div>
          </div>
             </div>  
          </div> 
</div>
        
        
        </>
    )
}