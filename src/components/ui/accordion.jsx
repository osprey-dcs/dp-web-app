import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CrossCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b", className)}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <AccordionPrimitive.Header className="flex items-center">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "flex flex-1 items-center justify-between py-2 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                {...props}
            >
                {children}
                {/* <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" /> */}
            </AccordionPrimitive.Trigger>
            <button>
                <Pencil2Icon className="h-4 w-4 mr-2 text-muted-foreground hover:text-foreground" />
            </button>
            <button>
                <CrossCircledIcon
                    onClick={() =>
                        props.props.handleDeleteBlock(props.props.index)
                    }
                    className="h-4 w-4 text-muted-foreground hover:text-foreground"
                />
            </button>
        </AccordionPrimitive.Header>
    )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <AccordionPrimitive.Content
            ref={ref}
            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            {...props}
        >
            <div className={cn("pb-2 pt-0", className)}>{children}</div>
        </AccordionPrimitive.Content>
    )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
