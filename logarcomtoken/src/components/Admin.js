import {link } from "react-router-dom";
import Users from "../components/User";


const Admin = () =>{
    return (
        <section>
            <h1>Pagina de administração</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <link to="/">Home</link>
            </div>
        </section>
    )
}