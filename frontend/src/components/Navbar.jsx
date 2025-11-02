import { Link } from "react-router-dom";
import { 
  Code2, Home, Palette, Users, CreditCard, Building2, 
  BookOpen, Rocket, BookMarked, Github, Twitter 
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-gray-950/75">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <Code2 className="h-6 w-6" />
          <span className="font-bold text-xl">Makeable.AI</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/live-preview"
                      >
                        <Rocket className="h-6 w-6 mb-2" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Makeable AI
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Create, customize and deploy AI-powered applications with ease.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Documentation" icon={BookOpen}>
                    Learn how to install and use our components.
                  </ListItem>
                  <ListItem href="/live-preview" title="Live Preview" icon={Palette}>
                    Preview your changes in real-time as you code.
                  </ListItem>
                  <ListItem href="/community" title="Community" icon={Users}>
                    Join our community of developers and creators.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Blog",
                      description: "Read our latest articles and updates.",
                      icon: BookOpen,
                      href: "/blog"
                    },
                    {
                      title: "Pricing",
                      description: "Choose the right plan for your needs.",
                      icon: CreditCard,
                      href: "/pricing"
                    },
                    {
                      title: "Enterprise",
                      description: "Solutions for larger organizations.",
                      icon: Building2,
                      href: "/enterprise"
                    }
                  ].map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/docs" className={navigationMenuTriggerStyle()}>
                Documentation
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Link to="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-accent rounded-md">
            <Github className="h-5 w-5" />
          </Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-accent rounded-md">
            <Twitter className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

const ListItem = ({ className, title, children, icon: Icon, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;
