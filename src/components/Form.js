import React, { useState, useEffect } from "react";

export default function Form({ setList, isEditing, currentMeme, handleSave }) {
    const [inputs, setInputs] = useState({
        topText: "",
        bottomText: "",
        imgUrl: ""
    });

    useEffect(() => {
        if (isEditing && currentMeme) {
            setInputs({
                topText: currentMeme.topText,
                bottomText: currentMeme.bottomText,
                imgUrl: currentMeme.imgUrl
            });
        } else if (currentMeme) {
            setInputs({
                topText: "",
                bottomText: "",
                imgUrl: currentMeme.imgUrl
            });
        }
    }, [isEditing, currentMeme]);

    async function fetchRandomMeme() {
        try {
            const response = await fetch("https://api.imgflip.com/get_memes");
            const data = await response.json();
            const memes = data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            setInputs(prevInputs => ({
                ...prevInputs,
                imgUrl: randomMeme.url
            }));
        } catch (error) {
            console.error("Error fetching memes:", error);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditing) {
            handleSave({ ...inputs, index: currentMeme.index });
        } else {
            setList(prevList => [...prevList, inputs]);
        }
        setInputs({ topText: "", bottomText: "", imgUrl: "" });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input
                    placeholder="Top Text"
                    name="topText"
                    value={inputs.topText}
                    onChange={handleChange}
                    className="form--input"
                />
                <input
                    placeholder="Bottom Text"
                    name="bottomText"
                    value={inputs.bottomText}
                    onChange={handleChange}
                    className="form--input"
                />
                <button className="form--button" type="submit">
                    {isEditing ? "Save" : "Submit"}
                </button>
                <button type="button" onClick={fetchRandomMeme} className="form--button">Get Random Meme</button>
            </form>
            <div className="meme">
                {inputs.imgUrl && <img src={inputs.imgUrl} alt="Meme preview" className="meme--image" />}
                {inputs.topText && <h2 className="meme--text top">{inputs.topText}</h2>}
                {inputs.bottomText && <h2 className="meme--text bottom">{inputs.bottomText}</h2>}
            </div>
        </div>
    );
}
