import PropTypes from "prop-types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import { cn } from "@/lib/utils";

const propTypes = {
    setDataSources: PropTypes.func,
    dataSourcesString: PropTypes.string,
    setDataSourcesString: PropTypes.func,
    dataSourcesRegex: PropTypes.string,
    setDataSourcesRegex: PropTypes.func,
    useRegex: PropTypes.bool,
    setUseRegex: PropTypes.func,
    setIsOpen: PropTypes.func
}

function DataSourcesActions(props) {
    const [dataSourcesErrClass, setDataSourcesErrClass] = useState("");
    const [regexPatternErrClass, setRegexPatternErrClass] = useState("");
    const [errText, setErrText] = useState("");

    function validateRegex(pattern) {
        try {
            new RegExp(pattern);
            return true;
        } catch (e) {
            setRegexPatternErrClass("border-destructive")
            return false;
        }
    }

    function handleApply(inputString) {
        if (inputString === "") {
            if (props.useRegex) setRegexPatternErrClass("border-destructive");
            else setDataSourcesErrClass("border-destructive");
            return;
        }
        if (props.useRegex) {
            if (!validateRegex(inputString)) {
                setErrText("Invalid RegEx pattern");
                return;
            }
        }
        const dataSourcesObj = {
            useRegex: props.useRegex,
            pvNames: !props.useRegex ? props.dataSourcesString.split(", ") : [],
            regexPattern: props.useRegex ? props.dataSourcesRegex : ""
        }
        props.setDataSources(dataSourcesObj);
        props.setIsOpen(false);
    }

    function clearErrors() {
        setErrText("");
        setDataSourcesErrClass("");
        setRegexPatternErrClass("");
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full">
                {
                    props.useRegex ?
                        <input
                            placeholder="RegEx Pattern" name="pv-regex" value={props.dataSourcesRegex}
                            onFocus={() => setRegexPatternErrClass("")} onChange={e => props.setDataSourcesRegex(e.target.value)}
                            className={cn("input-std w-full mb-2", regexPatternErrClass)}
                        ></input>
                        :
                        <input
                            placeholder="Data Sources" name="pv-name" value={props.dataSourcesString}
                            onFocus={() => setDataSourcesErrClass("")} onChange={e => props.setDataSourcesString(e.target.value)}
                            className={cn("input-std w-full mb-2", dataSourcesErrClass)}
                        ></input>
                }
                <div className="flex items-center space-x-2">
                    <Switch id="regex" checked={props.useRegex} onClick={() => props.setUseRegex(prevState => !prevState)} onFocus={clearErrors} />
                    <Label htmlFor="regex">RegEx</Label>
                </div>
            </div>
            <FilterErrorMessage>{errText}</FilterErrorMessage>
            <button onClick={() => handleApply(props.useRegex ? props.dataSourcesRegex : props.dataSourcesString)}
                className="btn-std w-full"
            >Apply</button>
        </div>
    )
}

DataSourcesActions.propTypes = propTypes;
export default DataSourcesActions;