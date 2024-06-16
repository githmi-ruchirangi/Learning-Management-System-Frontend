import React , {useEffect , useState} from "react";
import axios from "axios";
import Searchbar from "../SearchBar/Searchbar";
import "./Allcoursesdelupdlist.css";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

function AllcoursesDelUpdlist (){
    const [courses,setCourses] = useState([]);
    const [word,setWord] = useState([]);
    
    function getAllCourses(){
        axios.get(`http://localhost:8070/coursedetails`)
        .then((res)=>{
            console.log(res);
        setCourses(res.data);
        }).catch((err)=>{
            console.log(err);
        })
     }
    useEffect(()=>{
       
        getAllCourses();
    },[])
    
    const deletemodule=async (id , e)=>{
        console.log(id);
        if(window.confirm('Are you sure you want to delete?')){
            await axios.delete(`http://localhost:8070/coursedetails/${id}`)
            .then((res)=>{
                console.log(res.data);
                alert(res.data);
                getAllCourses();
            })
        }
       
    }
    
        const Search=(word)=>{
            if(!word){
                getAllCourses();
            }else{
            try{
            axios.get(`http://localhost:8070/coursedetails/searchcourse/${word}`)
            .then((res)=>{
                console.log(res);
            setCourses(res.data);
            }).catch((err)=>{
                console.log(err);
            })}catch{
                alert("no course")
            }}
        }
    const setID = (id,name,code,star,enddate,descrip,price) => {
        console.log(id);
        localStorage.setItem('id',id);
        localStorage.setItem('coursename',name);
        localStorage.setItem('modcode',code);
        localStorage.setItem('sdate',star);
        localStorage.setItem('edate',enddate);
        localStorage.setItem('price',price);
        localStorage.setItem('description',descrip);
        
    }
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage=15;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(courses.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(courses.length / itemsPerPage));
    }, [itemOffset, itemsPerPage ,courses]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % courses.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset); 
    }

    return(
        <div className="allcourselist">
            <div className="headoflist">
                <h3>All Courses In Learny</h3>
                <div className="searchbox">
                <div className="input-group">
                    <div className="form-outline">
                        <input id="search-input" type="search" onChange={(event)=>{Search(event.target.value)}} class="form-control" placeholder="Search"/>
                        
                        </div>
                        <button id="search-button" type="button"  class="btn btn-warning">
                        <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            

            <div className="table table-striped table-light">
            
            {currentItems.map(course=>{
                
                return(
                    <tbody>
                        <tr className="dotted" key={course.modid}>
                            <td class="w-25">{course.modname}</td>
                            <td class="w-25">{course.modcode}</td>
                            <td class="w-100">{course.descrip}</td>
                            <td class="w-10"><Link to="/updatecourse"><button className="btn btn-warning" onClick={()=>setID(course.modid,course.modname,course.modcode,course.sdate,course.enddate,course.descrip,course.price)}>Update</button></Link></td>
                            <td class="w-15"><button className="btn btn-danger" onClick={()=>deletemodule(course.modid)}>Delete</button></td>
                        </tr>
                    </tbody>
                    
                )
            })}
            <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"

                />
        </div>
        </div>
    )
}

export default AllcoursesDelUpdlist;