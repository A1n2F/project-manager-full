import { workspaceSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface CreateWorkspaceProps {
    isCreatingWorkspace: boolean
    setIsCreatingWorkspace: (isCreatingWorkspace: boolean) => void
}

export const colorOptions = [
    "#FF5733",
    "#33c1ff",
    "#28a745",
    "#ffc300",
    "#8e44ad",
    "#e67e22",
    "#2ecc71",
    "#34495e",
]

type WorkspaceForm = z.infer<typeof workspaceSchema>

export const CreateWorkspace = ({ isCreatingWorkspace, setIsCreatingWorkspace}: CreateWorkspaceProps) => {
    const form = useForm<WorkspaceForm>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
            color: colorOptions[0],
            description: ""
        }
    })

    const isPending = false

    const onSubmit = (data: WorkspaceForm) => {
        console.log(data)
    }

    return (
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} modal={true}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Workspace Name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Workspace Description" rows={3} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="color"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-3">
                                                {colorOptions.map((color) => (
                                                    <div
                                                        key={color}
                                                        onClick={() => field.onChange(color)}
                                                        className={cn(
                                                            "w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300",
                                                            field.value === color &&
                                                            "ring-2 ring-offset-2 ring-blue-500"
                                                        )}
                                                        style={{ background: color }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}