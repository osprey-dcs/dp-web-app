"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
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

const Combobox = React.forwardRef(
    (
        {
            className,
            options,
            optionsName,
            search = true,
            valueState,
            setValueState,
            width,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false);
        const [value, setValue] = React.useState("");
        const buttonRef = React.useRef(null);
        const popoverContentRef = React.useRef(null);
        const [contentWidth, setContentWidth] = React.useState("0");

        React.useEffect(() => {
            const buttonWidth = buttonRef.current.offsetWidth;
            setContentWidth(buttonWidth + "px");
        }, []);

        return (
            <div ref={ref} {...props} className={className}>
                <Popover open={open} onOpenChange={setOpen} className="">
                    <PopoverTrigger asChild className="">
                        <Button
                            ref={buttonRef}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn("justify-between", width)}
                        >
                            {valueState
                                ? options.find(
                                      (option) => option.value === valueState
                                  )?.label
                                : `${optionsName}`}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        ref={popoverContentRef}
                        className={cn("p-0")}
                        style={{ width: contentWidth }}
                    >
                        <Command>
                            {search && (
                                <CommandInput
                                    placeholder={`Search ${optionsName}...`}
                                    className="h-9"
                                />
                            )}
                            <CommandList>
                                <CommandEmpty>
                                    No {optionsName} found.
                                </CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                setValueState(
                                                    currentValue === valueState
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            {option.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    valueState === option.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        );
    }
);

export { Combobox };
