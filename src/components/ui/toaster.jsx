import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                actions,
                newLineActions = false,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                            <div className="w-full mt-2 flex gap-4">
                                {actions}
                            </div>
                            {/* {newLineActions && <div>{actions}</div>} */}
                        </div>
                        {/* {!newLineActions && actions} */}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
