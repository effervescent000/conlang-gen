import React, { useState, useEffect } from "react";
import axios from "axios";

import PhonemeChart from "./chart";

const GeneratePage = (props) => {
    const [phonemes, setPhonemes] = useState({});

    useEffect(() => {
        if (Object.keys(phonemes).length === 0) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/generate`)
                .then((response) => {
                    console.log(response);
                    setPhonemes(response.data);
                })
                .catch((error) => console.log(error.response));
        }
    }, []);

    return (
        <div className="generate-wrapper">
            <PhonemeChart phonemes={phonemes} />
        </div>
    );
};

export default GeneratePage;
