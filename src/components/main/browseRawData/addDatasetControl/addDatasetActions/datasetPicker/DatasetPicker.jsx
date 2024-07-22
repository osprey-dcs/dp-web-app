"use client";

import { usePVs } from "@/components/main/PVsContext";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function DatasetPicker({ dataSources, setDataSources }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");

    const pvs = usePVs();

    function onSelectItem(currentValue) {
        setValue(currentValue === value ? "" : currentValue);
        setDataSources(new Set(dataSources).add(currentValue));
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "w-full flex flew row items-center rounded text-sm text-muted-foreground hover:text-foreground"
                    )}
                >
                    <PlusIcon />
                    &nbsp; Add Data Sources
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-1" side="top">
                <Command>
                    <CommandInput
                        placeholder="Search Data Sources..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>Enter a PV</CommandEmpty>
                        <CommandGroup>
                            {[...pvs].map((pv) => (
                                <CommandItem
                                    key={pv}
                                    value={pv}
                                    onSelect={(currentValue) =>
                                        onSelectItem(currentValue)
                                    }
                                >
                                    {pv}
                                </CommandItem>
                            ))}
                            {search !== "" && (
                                <CommandItem
                                    key={search}
                                    value={search}
                                    onSelect={(currentValue) =>
                                        onSelectItem(currentValue)
                                    }
                                >
                                    {search}
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default DatasetPicker;
