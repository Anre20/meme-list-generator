import React, { useState } from "react";
import Form from "./Form";

export default function Meme() {
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMeme, setCurrentMeme] = useState(null);

    const listElements = list.map((meme, index) => (
        <div key={index} className="meme">
            <img src={meme.imgUrl} alt="" className="meme--image" />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            <button onClick={() => handleEdit(index)} className="meme--button">Edit</button>
            <button onClick={() => handleDelete(index)} className="meme--button">Delete</button>
        </div>
    ));

    function handleEdit(index) {
        setIsEditing(true);
        setCurrentMeme({ ...list[index], index });
    }

    function handleDelete(index) {
        setList(prevList => prevList.filter((_, i) => i !== index));
    }

    function handleSave(updatedMeme) {
        setList(prevList => prevList.map((meme, i) => (i === updatedMeme.index ? updatedMeme : meme)));
        setIsEditing(false);
        setCurrentMeme(null);
    }

    return (
        <main>
            <Form setList={setList} isEditing={isEditing} currentMeme={currentMeme} handleSave={handleSave} />
            <h1>Meme List</h1>
            <div className="meme-list">{listElements}</div>
        </main>
    );
}
