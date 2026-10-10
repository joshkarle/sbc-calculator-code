'use client'
import { useEffect, useState } from "react";
import InputField from "./Fields/InputField/InputField";
import "./page.css";

export default function Home() {
    const [mwc, setMWC] = useState<string>('');
    const [mwp, setMWP] = useState<string>('');
    const [pc, setPC] = useState<string>('');
    const [pcAlt, setPCAlt] = useState<string>('');
    const [pcUnit, setPCUnit] = useState<string>('0');
    const [me, setME] = useState<string>('');
    const [vp, setVP] = useState<string>('');

    useEffect(() => {
        if (pcUnit === "0") {
            setPCAlt((Number(pc) / Number(mwp) * 1000000).toFixed(2).toString());
        }
        else {
            setPCAlt((Number(pc) * Number(mwp) / 1000000).toFixed(2).toString());
        }
    }, [pc, mwp])

    useEffect(() => {
        const temp = pcAlt;
        setPCAlt(pc);
        setPC(temp);
    }, [pcUnit])

  return (
    <div>
      <div className="title">Ligand Dimensional Analysis</div>
      <main>
        <InputField
            label="Molecular Weight of Compound (g/mol)"
            type="number"
            placeholder="g/mol"
            value={mwc}
            onChange={setMWC}
        />
        <InputField
            label="Molecular Weight of Protein (Daltons)"
            type="number"
            placeholder="Daltons"
            value={mwp}
            onChange={setMWP}
        />
        <InputField
            label="Protein Concentration"
            type="number"
            value={pc}
            onChange={setPC}
            placeholder={pcUnit === "0" ? 'mg/mL' : 'μM'}
            radioOptions={[
                {value: '0', label: 'mg/mL'},
                {value: '1', label: 'μM'},
            ]}
            radioValue={pcUnit}
            onRadioValueChange={setPCUnit}
        />
        <InputField
            label="Molar Excess"
            type="number"
            placeholder="n-fold"
            value={me}
            onChange={setME}
        />
        <InputField
            label="Volume of Protein (μL)"
            type="number"
            placeholder="μL"
            value={vp}
            onChange={setVP}
        />
        <div className="result">
            <label>
                Amount of Compound to Add to Protein
                <div className="result__output">
                    {
                        pcUnit === '0' ?
                        ((Number(pc) * Number(vp) * Number(me) * Number(mwc)) / (1000 * Number(mwp))).toFixed(2)
                        : ((Number(pc) * Number(vp) * Number(me) * Number(mwc)) / (1000000000)).toFixed(2)
                    }
                    {" mg"}
                </div>
            </label>
        </div>
        <div className="result">
            <label>
                Mg Protein in Sample
                <div className="result__output">
                    {
                        pcUnit === '0' ?
                        ((Number(pc) / 1000) * Number(vp)).toFixed(2)
                        : ((Number(pc) * Number(vp) * Number(mwp)) / 1000000000).toFixed(2)
                    }
                    {" mg"}
                </div>
            </label>
        </div>
      </main>
    </div>
  );
}
