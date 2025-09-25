interface WorkspaceAvatarProps {
    color: string
    name: string
}

export const WorkspaceAvatar = ({color, name}: WorkspaceAvatarProps) => {
    return (
        <div className="w-6 h-6 rounded flex items-center justify-center" style={{background: color}}>
            <span className="font-medium text-white">
                {name.charAt(0).toUpperCase()}
            </span>
        </div>
    )
}