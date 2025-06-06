const links = [
    {
        label: 'Keylen',
        href: 'https://x.com/keylen1010'
    },
    {
        label: 'Marcus',
        href: 'https://x.com/Bitzack_01'
    }
]
const Footer = () => {
  return (
    <div className="flex items-center justify-center space-x-4 my-10 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <span>Designed by</span>
            {links.map((link) => (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" key={link.label}>@{link.label}</a>
            ))} |
            <a href="https://github.com/BiscuitCoder/eip-7702-aggregator" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Github</a>
            |
            <a href="https://github.com/CasualHackathon/EIP-7702" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">EIP-7702 Casual Hackathon</a>
            |
            <a href="https://www.uxscout.xyz/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">EIP-7702</a>
        </div>
    </div>
  )
}

export default Footer