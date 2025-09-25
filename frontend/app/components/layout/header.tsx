import { useAuth } from "@/provider/auth-context"
import type { Workspace } from "@/types"
import { Button } from "../ui/button"
import { Bell, PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router"
import { WorkspaceAvatar } from "../workspace/workspace-avatar"

interface HeaderProps {
    onWorkspaceSelected: (workspace: Workspace) => void
    selectedWorkspace: Workspace | null
    onCreatingWorkspace: () => void
}

export const Header = ({ onWorkspaceSelected, selectedWorkspace, onCreatingWorkspace }: HeaderProps) => {
    const { user, logout } = useAuth()

    const workspaces = []

    return (
        <div className="bg-background sticky top-0 z-40 border-b">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {selectedWorkspace ?  (
                                <>
                                {selectedWorkspace.color && <WorkspaceAvatar color={selectedWorkspace.color} name={selectedWorkspace.name} />}
                                <span className="font-medium">{selectedWorkspace?.name}</span>
                                </>
                            ) : (
                                <span className="font-medium">Select Workspace</span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            {workspaces.map((workspace) => (
                                <DropdownMenuItem key={workspace._id} onClick={() => onWorkspaceSelected(workspace)}>
                                    {workspace.color && (
                                        <WorkspaceAvatar color={workspace.color} name={workspace.name} />
                                    )}

                                    <span className="ml-2">{workspace.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>

                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={onCreatingWorkspace}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Create Workspace
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button className="rounded-full border p-1">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={user?.profilePicture} />
                                    <AvatarFallback className="bg-black text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My account</DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem>
                                <Link to="/user/profile">Profile</Link>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem onClick={logout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}