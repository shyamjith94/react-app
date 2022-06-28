import BlogList from "./Bloglist";
import useFetch from "../hook/useFetch";

const Home = () => {

    const { data: blogs, isPending, error } = useFetch("http://localhost:8000/blogs")
    
    return (
        <div className="content">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading ....</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs..." />}
        </div>
    );
}

export default Home;
