import { cn } from "@/lib/utils"
import type { Workspace } from "@/types"
import { Icon, type LucideIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useLocation, useNavigate } from "react-router"

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
    items: {
        title: string
        href: string
        icon: LucideIcon
    }[]
    isCollapsed: boolean
    currentWorkspace: Workspace | null
    className?: string
}

export const SidebarNav = ({ items, isCollapsed, currentWorkspace, className, ...props}: SidebarNavProps) => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
            {items.map((element) => {
                const Icon = element.icon
                const isActive = location.pathname === element.href

                const handleClick = () => {
                    if(element.href === "/workspaces") {
                        navigate(element.href)
                    } else if(currentWorkspace && currentWorkspace._id) {
                        navigate(`${element.href}?workspaceId=${currentWorkspace._id}`)
                    } else {
                        navigate(element.href)
                    }
                }

                return <Button 
                            key={element.href}
                            variant={isActive ? "outline" : "ghost"}
                            className={cn("justify-start", isActive && "bg-blue-800/20 text-blue-600 font-medium")}
                            onClick={handleClick}
                            >
                                <Icon className="mr-2 size-4" />
                                {isCollapsed ? (
                                    <span className="sr-only">
                                        {element.title}
                                    </span>
                                ) : (
                                    element.title
                                )}
                            </Button>
            })}
        </nav>
    )
}