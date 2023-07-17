//Blogging App using Hooks
import { useState, useRef, useEffect, useReducer } from "react";

// 2. Reducer function
const blogsReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [action.blog, ...state];
      case "REMOVE":
        return state.filter((blog, index) => index !== action.index);
      default:
        return [];
    }
  };
export default function Blog(){

    const [formData, setformData] = useState({title:"", content:""})
    //const [blogs, setBlogs] =  useState([]);
    
    //1. replacing useState for blogs with useReducer hook
    
    const [blogs, dispatch] = useReducer(blogsReducer,[]);

    //useRef hook initialized
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    },[]);

    useEffect(() => {
        
        console.log("Runs on Blogs Mount/Update!!");
        if (blogs.length && blogs[0].title) {
          document.title = blogs[0].title;
        } else {
          document.title = "No blogs!";
        }
      }, [blogs]);

    function handleSubmit(e){
        e.preventDefault();

        //setBlogs([{title: formData.title,content:formData.content}, ...blogs]);
        // 3. Replacing setBlogs with dispatch function
        dispatch({type: "ADD", blog: {title:formData.title, content:formData.content}});

        setformData({title:"", content:""});
        //Setting focus on title after adding a blog
        titleRef.current.focus();
        console.log(blogs);
    }

    function removeBlog(i){

        //setBlogs( blogs.filter((blog,index)=> index !== i));
        //4. Replacing setBlogs with dispatch
        dispatch({type: "REMOVE", index: i})
 
     }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref = {titleRef}
                                onChange = {(e) => setformData({title: e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange = {(e) => setformData({title: formData.title,content: e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog">
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <div className="blog-btn">
                        <button onClick={() => {
                            removeBlog(i)
                        }}
                        className="btn remove">

                            Delete

                        </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
