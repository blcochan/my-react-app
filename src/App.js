import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function Header(props) {
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}
function Nav(props) {
    const lis = props.topic.map((li) => {
        return (
            <li key={li.id}>
                <a
                    href={"/read/" + li.id}
                    id={li.id}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onChangeMode(e.target.id);
                    }}
                >
                    {li.title}
                </a>
            </li>
        );
    });
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}
function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}
function CreateForm(props) {
    return (
        <article>
            <h2>Create</h2>
            <form
                onSubmit={(e) => {
                    const title = e.target.title.value;
                    const body = e.target.body.value;
                    e.preventDefault();
                    props.onCreate(title, body);
                }}
            >
                <input type="text" name="title" placeholder="title" />
                <br />
                <textarea name="body" placeholder="body" />
                <br />
                <input type="submit" value="Create" />
            </form>
        </article>
    );
}
function UpdateForm(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    return (
        <article>
            <h2>Update</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onUpdate(title, body);
                }}
            >
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <br />
                <textarea
                    name="body"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                />
                <br />
                <input type="submit" value="Update" />
            </form>
        </article>
    );
}

function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const [topics, setTopics] = useState([
        { id: "html", title: "html", body: "html is ..." },
        { id: "css", title: "css", body: "css is ..." },
        { id: "js", title: "js", body: "js is ..." },
    ]);

    let contents = null;
    let contextControl = null;
    if (mode === "WELCOME") {
        contents = <Article title="Welcome" body="Hello, WEB" />;
    } else if (mode === "READ") {
        const item = topics.find((item) => {
            return item.id === id;
        });
        contents = <Article title={item.title} body={item.body} />;
        contextControl = (
            <React.Fragment>
                <li>
                    <a
                        href={"/update/" + id}
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("UPDATE");
                        }}
                    >
                        Update
                    </a>
                </li>
                <li>
                    <input
                        type="button"
                        value="Delete"
                        onClick={() => {
                            const newTopics = [...topics].filter((item) => {
                                return item.id !== id;
                            });
                            setTopics(newTopics);
                            setMode("WELCOME");
                        }}
                    />
                </li>
            </React.Fragment>
        );
    } else if (mode === "CREATE") {
        contents = (
            <CreateForm
                onCreate={(title, body) => {
                    const newTopics = [...topics];
                    const newTopic = { id: title, title: title, body: body };
                    newTopics.push(newTopic);
                    setTopics(newTopics);
                    setMode("READ");
                    setId(newTopic.id);
                }}
            />
        );
    } else if (mode === "UPDATE") {
        const newTopics = [...topics];
        const item = newTopics.find((item) => {
            return item.id === id;
        });
        contents = (
            <UpdateForm
                title={item.title}
                body={item.body}
                onUpdate={(title, body) => {
                    item.title = title;
                    item.body = body;
                    setTopics(newTopics);
                    setMode("READ");
                }}
            />
        );
    }

    return (
        <div>
            <Header
                title="WEB"
                onChangeMode={() => {
                    setMode("WELCOME");
                }}
            />
            <Nav
                topic={topics}
                onChangeMode={(id) => {
                    setMode("READ");
                    setId(id);
                }}
            />
            {contents}
            <ul>
                <li>
                    <a
                        href="/create"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode("CREATE");
                        }}
                    >
                        Create
                    </a>
                </li>
                {contextControl}
            </ul>
        </div>
    );
}

export default App;
