import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

const PhonemeChart = ({ phonemes }) => {
    const placeConditions = {
        bilabial: {
            lab: "+",
            cor: 0,
        },
        dental: {
            cor: 1,
        },
        alveolar: {
            cor: 2,
        },
        palatal: {
            cor: 4,
        },
        velar: {
            dor: "+",
            hgt: "+",
        },
    };
    const mannerConditions = {
        nasal: {
            con: "+",
            nas: "+",
        },
        stop: {
            con: "+",
            son: "-",
            cnt: "-",
            nas: "-",
        },
        fricative: {
            con: "+",
            son: "-",
            cnt: "+",
        },
    };
    const [poa, setPoa] = useState({});
    const [moa, setMoa] = useState({});

    useEffect(() => {
        const poaCount = { bilabial: 0, dental: 0, alveolar: 0, palatal: 0, velar: 0 };
        const moaCount = { nasal: 0, stop: 0, affricate: 0, fricative: 0 };
        if (phonemes && Object.keys(phonemes).length > 0) {
            for (const [phoneme, values] of Object.entries(phonemes)) {
                if (values.con === "+") {
                    if (values.lab === "+") {
                        poaCount.bilabial++;
                    } else if (values.cor === 1) {
                        poaCount.dental++;
                    } else if (values.cor === 2) {
                        poaCount.alveolar++;
                    } else if (values.cor === 4) {
                        poaCount.palatal++;
                    } else if (values.dor === "+" && values.hgt === "+") {
                        poaCount.velar++;
                    }

                    if (values.nas === "+") {
                        moaCount.nasal++;
                    } else {
                        if (values.cnt === "-") {
                            moaCount.stop++;
                        } else if (values.cnt === "+") {
                            moaCount.fricative++;
                        }
                    }
                }
            }
        }
        setPoa(poaCount);
        setMoa(moaCount);
    }, [phonemes]);

    const getPhoneme = (places, manners) => {
        const getMatches = (conditions, phoneme) => {
            for (const condition of Object.keys(conditions)) {
                if (phonemes[phoneme][condition] !== conditions[condition]) {
                    return false;
                }
            }
            return true;
        };

        const placeMatches = [];
        const mannerMatches = [];
        for (const phoneme of Object.keys(phonemes)) {
            if (getMatches(places, phoneme)) {
                placeMatches.push(phoneme);
            }
            if (getMatches(manners, phoneme)) {
                mannerMatches.push(phoneme);
            }
        }
        return placeMatches.filter((x) => mannerMatches.includes(x));
    };

    return (
        <div className="chart">
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(placeConditions).map((label) => {
                            return poa[label] ? <th key={label}>{label}</th> : null;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(mannerConditions).map(([manLabel, manCond]) => {
                        return moa[manLabel] ? (
                            <tr key={manLabel} className={manLabel}>
                                <th>{manLabel}</th>
                                {Object.entries(placeConditions).map(([plaLabel, plaCond]) => {
                                    return poa[plaLabel] ? (
                                        <td key={`${manLabel} ${plaLabel}`}>
                                            {getPhoneme(plaCond, manCond).map((phoneme) => (
                                                <span key={phoneme}>{phoneme}</span>
                                            ))}
                                        </td>
                                    ) : null;
                                })}
                            </tr>
                        ) : null;
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default PhonemeChart;
